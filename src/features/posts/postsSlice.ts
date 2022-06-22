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
      if (error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue("Oops, algo deu errado.");
    }
  }
);

interface IPosts {
  posts: any[];
  status: "idle" | "pending" | "success" | "failure";
  error: null | string;
}

const initialState: IPosts = {
  posts: [],
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
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status = "failure";
        state.error = typeof payload === "string" ? payload : "Algo deu errado";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload.data;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
