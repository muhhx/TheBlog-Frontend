import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import BASE_URL from "../../config/axios";

interface IAuth {
  isAuth: boolean;
  name: null | string;
  status: "idle" | "pending" | "success" | "failure";
}

const initialState: IAuth = {
  isAuth: false,
  name: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.status = "pending";
    },
    fetchFulfilled: (state, action: PayloadAction<string>) => {
      state.status = "success";
      state.isAuth = true;
      state.name = action.payload;
    },
    fetchRejected: (state) => {
      state.status = "failure";
    },
    login: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.name = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { login, logout, fetchPending, fetchFulfilled, fetchRejected } =
  authSlice.actions;
export default authSlice.reducer;
