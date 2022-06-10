import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosPublic from "../../config/axios";

interface IBackground {
  image: string | null;
  status: "idle" | "pending" | "success" | "failure";
}

const initialState: IBackground = {
  image: null,
  status: "idle",
};

export const fetchBackground = createAsyncThunk(
  "background/fetchBackground",
  async () => {
    try {
      const result = await axiosPublic.get("/api/background");

      return result.data.selectedImage;
    } catch (error) {
      return null;
    }
  }
);

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackground.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBackground.fulfilled, (state, action) => {
        state.image = action.payload;
        state.status = "success";
      })
      .addCase(fetchBackground.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectBackground = (state: RootState) => state.background;
export default backgroundSlice.reducer;
