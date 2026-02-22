import { createSlice } from "@reduxjs/toolkit";

type CreateMenuState = {
  isOpen: boolean;
};

const initialState: CreateMenuState = {
  isOpen: false,
};

const createBtnSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const createReducer = createBtnSlice.reducer;
export const { toggle, close } = createBtnSlice.actions;
