import { createSlice } from "@reduxjs/toolkit";

type NotifState = {
  isOpen: boolean;
};

const initialState: NotifState = {
  isOpen: false,
};

const notifSlice = createSlice({
  name: "notif",
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

export const notifReducer = notifSlice.reducer;
export const { toggle, close, open } = notifSlice.actions;
