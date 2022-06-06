import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { ILoginData } from "./types";

interface IAuth {
  isAuth: boolean;
  status: "idle" | "pending" | "success" | "failure";
  error: null | string;
  loggedOut: boolean;
}

export const fetchUser = createAsyncThunk(
  "auth/fetchAuth",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.fetchUser();

      return data;
    } catch (error) {
      //@ts-ignore
      if (error instanceof Error && error.response.data.message) {
        //@ts-ignore
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        const message = "Algo de inesperado aconteceu";
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginAuth",
  async (loginData: ILoginData, thunkAPI) => {
    try {
      const data = await authService.login(loginData);

      return data;
    } catch (error) {
      //@ts-ignore
      if (error instanceof Error && error.response.data.message) {
        //@ts-ignore
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        const message = "Algo de inesperado aconteceu";
        return message;
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutAuth",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.logout();

      return data;
    } catch (error) {
      //@ts-ignore
      if (error instanceof Error && error.response.data.message) {
        //@ts-ignore
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        const message = "Algo de inesperado aconteceu";
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const initialState: IAuth = {
  isAuth: false,
  loggedOut: false,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.status = "success";
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.loggedOut = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "success";
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload
          ? String(action.payload)
          : "Algo deu errado ao fazer login.";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success";
        state.isAuth = false;
        state.loggedOut = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export default authSlice.reducer;
