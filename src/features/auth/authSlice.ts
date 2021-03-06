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
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível autenticar.",
        });
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

export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const { email, password } = payload;
      const state: any = thunkAPI.getState();

      if (state?.auth?.isAuth) {
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Você já está logado",
        });
      }

      const response = await authServices.loginSession(email, password);

      const {
        userId,
        userName: name,
        userUsername: username,
        userPicture: picture,
      } = response;

      return { success: true, userId, name, username, picture };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível fazer o login.",
        });
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async (
    payload: {
      name?: string;
      username?: string;
      bio?: string;
      picture?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await authServices.updateAccount(payload);

      return { success: true, response };
    } catch (error: any) {
      if (error.response.data.message)
        return thunkAPI.rejectWithValue({
          success: false,
          message: error.response.data.message,
        });
      else
        return thunkAPI.rejectWithValue({
          success: false,
          message: "Oops, não foi possível mudar seus dados.",
        });
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    payload: { password: string; passwordConfirmation: string },
    thunkAPI
  ) => {
    try {
      await authServices.changePassword(
        payload.password,
        payload.passwordConfirmation
      );

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
          message: "Oops, não foi possível mudar sua senha.",
        });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (payload: { password: string }, thunkAPI) => {
    try {
      await authServices.deleteAccount(payload.password);

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
          message: "Oops, não foi possível deletar sua conta.",
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
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isAuth = true;

        state.userId = action.payload.userId;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.picture = action.payload.picture;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.isAuth = false;

        state.userId = null;
        state.name = null;
        state.username = null;
        state.picture = null;
      })
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        const { name, username, picture } = payload.response;
        console.log(name, username, picture);
        state.name = name ? name : state.name;
        state.username = username ? username : state.username;
        state.picture = picture ? picture : state.picture;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.name = null;
        state.username = null;
        state.picture = null;
        state.userId = null;
        state.isAuth = false;
      });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
