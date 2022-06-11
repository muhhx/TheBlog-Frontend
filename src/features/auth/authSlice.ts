import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IAuth {
  isAuth: boolean;
  name: null | string;
  userId: null | string;
  status: "idle" | "pending" | "success" | "failure";
}

const initialState: IAuth = {
  isAuth: false,
  name: null,
  userId: null,
  status: "idle",
};

interface IProps {
  username: string;
  userId: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.status = "pending";
    },
    fetchFulfilled: (state, action: PayloadAction<IProps>) => {
      state.status = "success";
      state.isAuth = true;
      state.name = action.payload.username;
      state.userId = action.payload.userId;
    },
    fetchRejected: (state) => {
      state.status = "failure";
    },
    login: (state, action: PayloadAction<IProps>) => {
      state.isAuth = true;
      state.name = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isAuth = false;
      state.name = null;
      state.userId = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { login, logout, fetchPending, fetchFulfilled, fetchRejected } =
  authSlice.actions;
export default authSlice.reducer;
