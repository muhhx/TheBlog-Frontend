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
  favorites: null,
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
  async (payload: { username: string; userId: string | null }, thunkAPI) => {
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

      let favorites = null;
      if (isCurrentUser) {
        favorites = await userServices.fetchUserFavorites(payload.username);
      }

      return {
        profile,
        posts,
        favorites,
        following,
        followers,
        isCurrentUser,
        isBeingFollowed,
      };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else
        return thunkAPI.rejectWithValue(
          "Oops, não foi possível coletar os dados desse usuário."
        );
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (payload: { id: string }, thunkAPI) => {
    try {
      await userServices.followUser(payload.id);

      const state: any = thunkAPI.getState();

      const { userId, username, name, picture } = state.auth;

      return { success: true, userId, username, name, picture };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível seguir o usuário.",
        });
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (payload: { id: string }, thunkAPI) => {
    try {
      await userServices.unfollowUser(payload.id);

      const state: any = thunkAPI.getState();

      const { userId } = state.auth;

      return { success: true, userId };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível deixar de seguir o usuário.",
        });
    }
  }
);

export const createPost = createAsyncThunk(
  "user/createPost",
  async (
    payload: {
      title: string;
      summaryInput: string;
      content: string;
      image: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await userServices.createPost(
        payload.title,
        payload.summaryInput,
        payload.image,
        payload.content
      );

      return { success: true, message: "Post criado com sucesso", data };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível criar o post.",
        });
    }
  }
);

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async (payload: { id: string }, thunkAPI) => {
    try {
      const { postId } = await userServices.deletePost(payload.id);

      return { success: true, postId };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível deletar o post.",
        });
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "user/removeFavorite",
  async (payload: { postId: string }, thunkAPI) => {
    try {
      await userServices.removeFavorite(payload.postId);

      return { success: true, postId: payload.postId };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível remover dos favoritos.",
        });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
        state.favorites = payload.favorites;
        state.followers = payload.followers.data;
        state.following = payload.following.data;
        state.isBeingFollowed = payload.isBeingFollowed;
        state.isCurrentUser = payload.isCurrentUser;
        state.followersCount = payload.followers.followersCount;
        state.followingCount = payload.following.followingCount;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.followers.push({
          _id: payload.userId,
          name: payload.name,
          username: payload.username,
          picture: payload.picture,
        });
        state.isBeingFollowed = true;
        state.followersCount += 1;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.followers = state.followers.filter(
          (follower) => follower._id !== payload.userId
        );
        state.isBeingFollowed = false;
        state.followersCount -= 1;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post._id !== payload.postId);
      })
      .addCase(removeFavorite.fulfilled, (state, { payload }) => {
        const newFavorites = state.favorites?.filter(
          (fav) => fav._id !== payload.postId
        );
        state.favorites = newFavorites || null;
      });
  },
});

export const selectUserAll = (state: RootState) => state.user;
export const selectUserFollowers = (state: RootState) => state.user.followers;
export const selectUserFollowing = (state: RootState) => state.user.following;
export default userSlice.reducer;
