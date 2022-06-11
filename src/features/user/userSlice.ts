import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IFollower } from "./userTypes";
import userServices from "./userServices";
import { RootState } from "../../app/store";

const initialState: IUser = {
  profile: {
    _id: "",
    bio: "",
    email: "",
    name: "",
    picture: "",
    username: "",
  },
  posts: [],
  following: [],
  followingCount: 0,
  followers: [],
  followersCount: 0,
  isBeingFollowed: false,
  isCurrentUser: false,
  status: "idle",
  error: null,
};

export const fetchAllUserData = createAsyncThunk(
  "user/fetchAllUserData",
  async (payload: { username: string; userId: string | undefined | null }) => {
    try {
      const profile = await userServices.fetchUserInfo(payload.username);
      const posts = await userServices.fetchUserPosts(payload.username);
      const following = await userServices.fetchUserFollowing(payload.username);
      const followers = await userServices.fetchUserFollowers(payload.username);

      const isCurrentUser =
        payload.userId && payload.userId === profile.data._id ? true : false;

      const result = followers.data.find(
        (follower: IFollower) => follower._id === payload.userId
      );
      const isBeingFollowed = result ? true : false;

      return {
        profile,
        posts,
        following,
        followers,
        isCurrentUser,
        isBeingFollowed,
      };
    } catch (error: any) {
      if (error.response.data.message) return error.response.data.message;
      else return "Oops, não foi possível coletar os dados desse usuário.";
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    followUser: (
      state,
      action: PayloadAction<{ name: string; username: string; _id: string }>
    ) => {
      state.followers.push({
        name: action.payload.name,
        username: action.payload.username,
        _id: action.payload._id,
      });
      state.isBeingFollowed = true;
      state.followersCount += 1;
    },
    unfollowUser: (state, action: PayloadAction<{ userId: string }>) => {
      state.followers = state.followers.filter(
        (follower) => follower._id !== action.payload.userId
      );
      state.isBeingFollowed = false;
      state.followersCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllUserData.rejected, (state, { payload }) => {
        state.status = "failure";
        state.error = typeof payload === "string" ? payload : null;
      })
      .addCase(fetchAllUserData.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.profile = payload.profile.data;
        state.posts = payload.posts.data;
        state.followers = payload.followers.data;
        state.following = payload.following.data;
        state.isBeingFollowed = payload.isBeingFollowed;
        state.isCurrentUser = payload.isCurrentUser;
        state.followersCount = payload.followers.followersCount;
        state.followingCount = payload.following.followingCount;
      });
  },
});

export const selectUserAll = (state: RootState) => state.user;
export const { followUser, unfollowUser } = userSlice.actions;
export default userSlice.reducer;

//Dados do usuaro (preciso dos dados do following/followers em vários outros componentes, por exemplo)
//On component unmount (got out of the page, setUser to null!) -  Só vou ter os dados do usuario na pagina do usuario

//Esse userSlice tem que ser em relaçao a mim. Preciso dos meus dados atualizados, nao dos outros.
//Quando eu entro no post, verificar se eu sigo ou n e colocar no isFollowing. Os dados das outras pessoas só precisam mudar uma vez

//Simplismente pegar os dados da pessoa da pagina, ai na propria pagina, comparar com os dados do usuario autenticado. a partir disso, tomar decisoes
