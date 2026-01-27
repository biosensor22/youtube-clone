import { createSlice } from "@reduxjs/toolkit";

type MenuState = {
  isOpen: boolean;
};

const initialState: MenuState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const menuReducer = menuSlice.reducer;
export const { open, close, toggle } = menuSlice.actions;
