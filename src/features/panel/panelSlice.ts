import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IPanel {
  display: boolean;
  category: null | "seguidores" | "seguindo" | "create" | "delete" | "menu";
  payload: null | string | { title: string; content: string };
}

const initialState: IPanel = {
  display: false,
  category: null,
  payload: null,
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    openPanel: (state, { payload }) => {
      state.display = true;
      state.category = payload.category;
      state.payload = payload.payload;
    },
    closePanel: (state) => {
      state.display = false;
      state.category = null;
      state.payload = null;
    },
  },
});

export const selectPanelState = (state: RootState) => state.panel;
export const { openPanel, closePanel } = panelSlice.actions;
export default panelSlice.reducer;
