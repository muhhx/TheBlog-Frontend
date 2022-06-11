import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import IBackground from "./backgroundTypes";
import backgroundServices from "./backgroundServices";

const initialState: IBackground = {
  image: null,
  status: "idle",
};

export const fetchBackground = createAsyncThunk(
  "background/fetchBackground",
  async () => {
    try {
      const result = await backgroundServices.fetch();

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
