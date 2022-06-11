import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import IAuth from "./authTypes";

const initialState: IAuth = {
  isAuth: false,
  name: null,
  username: null,
  userId: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.status = "pending";
    },
    fetchFulfilled: (
      state,
      action: PayloadAction<{ name: string; userId: string; username: string }>
    ) => {
      state.status = "success";
      state.isAuth = true;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    fetchRejected: (state) => {
      state.status = "failure";
    },
    login: (
      state,
      action: PayloadAction<{ name: string; userId: string; username: string }>
    ) => {
      state.isAuth = true;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isAuth = false;
      state.name = null;
      state.userId = null;
      state.username = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { login, logout, fetchPending, fetchFulfilled, fetchRejected } =
  authSlice.actions;
export default authSlice.reducer;
