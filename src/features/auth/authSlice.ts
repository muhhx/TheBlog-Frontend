import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import IAuth from "./authTypes";
import authServices from "./authServices";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (payload, thunkAPI) => {
    try {
      const session = await authServices.fetchSession();

      const {
        userName: name,
        userUsername: username,
        userPicture: picture,
        userId,
      } = session;

      return { name, username, picture, userId };
    } catch (error: any) {
      //Handle error

      //Handle sessão expirada (n vou ter que handle esse especificamente aqui)
      if (error.response.status === 403) {
        console.log("Here");
        thunkAPI.dispatch(logout());
      }

      return thunkAPI.rejectWithValue("Nenhuma sessão encontrada");
    }
  }
);

export const logoutAuth = createAsyncThunk(
  "auth/logoutAuth",
  async (payload, thunkAPI) => {
    try {
      await authServices.logoutSession();

      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        success: false,
        message: "Algo deu errado ao fazer o logout.",
      });
    }
  }
);

const initialState: IAuth = {
  isAuth: false,
  name: null,
  username: null,
  picture: null,
  userId: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        name: string;
        userId: string;
        username: string;
        picture: string;
      }>
    ) => {
      state.isAuth = true;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.picture = action.payload.picture;
    },
    logout: (state) => {
      state.isAuth = false;
      state.name = null;
      state.userId = null;
      state.username = null;
      state.picture = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuth = true;

        state.userId = action.payload.userId;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.picture = action.payload.picture;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = "failure";
        state.isAuth = false;

        state.userId = null;
        state.name = null;
        state.username = null;
        state.picture = null;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.isAuth = false;

        state.userId = null;
        state.name = null;
        state.username = null;
        state.picture = null;
      });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
