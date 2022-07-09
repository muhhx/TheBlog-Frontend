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
  comments: [],
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
  async (
    { slug, userId }: { slug: string; userId: string | null },
    thunkAPI
  ) => {
    try {
      const { user, post } = await postServices.getPostData(slug);
      const upvotes = await postServices.getPostUpvotes(post._id);
      const isSaved = await postServices.getFavoriteCheck(post._id, userId);
      const comments = await postServices.getComments(post._id);

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
        comments,
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

export const createComment = createAsyncThunk(
  "post/createComment",
  async (
    { postId, comment }: { postId: string; comment: string },
    thunkAPI
  ) => {
    try {
      const newComment = await postServices.createComment(comment, postId);

      return { success: true, newComment };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível criar o comentário.",
        });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({ commentId }: { commentId: string }, thunkAPI) => {
    try {
      await postServices.deleteComment(commentId);

      return { success: true, commentId };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível deletar o comentário.",
        });
    }
  }
);

export const updateComment = createAsyncThunk(
  "post/updateComment",
  async (
    { commentId, comment }: { commentId: string; comment: string },
    thunkAPI
  ) => {
    try {
      const updatedComment = await postServices.updateComment(
        commentId,
        comment
      );

      return { success: true, updatedComment };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível atualizar o comentário.",
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
        state.comments = payload.comments;
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
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.comments.push(payload.newComment);
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments.filter(
          (comment) => comment.comment._id !== payload.commentId
        );
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        for (let i = 0; i < state.comments.length; i++) {
          if (state.comments[i].comment._id === payload.updatedComment._id) {
            state.comments[i].comment.comment = payload.updatedComment.comment;
          }
        }
      }),
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
