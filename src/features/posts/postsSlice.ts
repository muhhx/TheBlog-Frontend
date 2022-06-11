import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import postsService from "./postsService";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await postsService.fetchPosts();

      return data;
    } catch (error: any) {
      const message = error.response.data.message;
      error instanceof Error && message
        ? thunkAPI.rejectWithValue(message)
        : thunkAPI.rejectWithValue("ERRO");
    }
  }
);

interface IPosts {
  posts: any[];
  selectedPost: null | string;
  status: "idle" | "pending" | "success" | "failure";
  error: null | string;
}

const initialState: IPosts = {
  posts: [],
  selectedPost: null,
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload
          ? String(action.payload)
          : "Algo deu errado ao registrar o usuário.";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload.data;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;

//Actions:
/**
 * 1. Fetch
 * 2. Filter
 * 3. Search (filter by search name)
 * 4. Get posts by tag
 * 5. Get posts from people that user follows, etc
 */
