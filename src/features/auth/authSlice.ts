import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import BASE_URL from "../../config/axios";

interface IAuth {
  isAuth: boolean;
  name: null | string;
  status: "idle" | "pending" | "success" | "failure";
}

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (payload, thunkAPI) => {
    try {
      const data = await BASE_URL.get("/session");

      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return thunkAPI.rejectWithValue(
          JSON.stringify(error.response.data.message)
        );
      } else {
        return thunkAPI.rejectWithValue("Algo deu errado");
      }
    }
  }
);

const initialState: IAuth = {
  isAuth: false,
  name: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.name = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuth = true;
        state.name = action.payload?.data.data.userName || "Usuário";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
