import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import postServices from "./postServices";
import { IPost } from "./postTypes";

const initialState: IPost = {
  isCurrentUser: false,
  isLiked: false,
  isSaved: false,
  upvotes: [],
  upvotesCount: 0,
  data: {
    _id: "",
    __v: 0,
    authorId: "",
    slug: "",
    title: "",
    summary: "",
    content: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  },
  user: {
    _id: "",
    picture: "",
    name: "",
    username: null,
  },
  status: "idle",
  error: null,
};

export const fetchPostData = createAsyncThunk(
  "post/fetchPostData",
  async ({ slug, userId }: { slug: string; userId: string }, thunkAPI) => {
    try {
      const { user, post } = await postServices.getPostData(slug);
      const upvotes = await postServices.getPostUpvotes(post._id);
      const isSaved = await postServices.getFavoriteCheck(post._id, userId);

      const userLiked = upvotes.filter((user) => user._id === userId);

      const isCurrentUser = post.authorId === userId ? true : false;
      const isLiked = userLiked.length === 0 ? false : true;
      const upvotesCount = upvotes.length;

      return {
        isCurrentUser,
        isLiked,
        isSaved,
        upvotes,
        upvotesCount,
        post,
        user,
      };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível acessar o post.",
        });
    }
  }
);

export const upvotePost = createAsyncThunk(
  "post/upvotePost",
  async ({ postId }: { postId: string }, thunkAPI) => {
    try {
      await postServices.upvotePost(postId);

      return { success: true };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível curtir o post.",
        });
    }
  }
);

export const unvotePost = createAsyncThunk(
  "post/unvotePost",
  async ({ postId }: { postId: string }, thunkAPI) => {
    try {
      await postServices.unvotePost(postId);

      return { success: true };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível dar dislike no post.",
        });
    }
  }
);

export const savePost = createAsyncThunk(
  "post/savePost",
  async ({ postId }: { postId: string }, thunkAPI) => {
    try {
      await postServices.savePost(postId);

      return { success: true };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível salvar o post aos favoritos.",
        });
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async ({ postId }: { postId: string }, thunkAPI) => {
    try {
      await postServices.removePost(postId);

      return { success: true };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível remover o post dos favoritos.",
        });
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostData.rejected, (state, { payload }: any) => {
        state.status = "failure";
        state.error =
          typeof payload.message === "string" ? payload.message : null;
      })
      .addCase(fetchPostData.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.isCurrentUser = payload.isCurrentUser;
        state.isLiked = payload.isLiked;
        state.isSaved = payload.isSaved;
        state.upvotesCount = payload.upvotesCount;
        state.upvotes = payload.upvotes;
        state.data = payload.post;
        state.user = payload.user;
      })
      .addCase(upvotePost.fulfilled, (state) => {
        state.isLiked = true;
        state.upvotesCount += 1;
      })
      .addCase(unvotePost.fulfilled, (state) => {
        state.isLiked = false;
        state.upvotesCount -= 1;
      })
      .addCase(savePost.fulfilled, (state) => {
        state.isSaved = true;
      })
      .addCase(removePost.fulfilled, (state) => {
        state.isSaved = false;
      }),
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
