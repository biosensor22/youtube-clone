import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "@/widgets/side-menu";
import { notifReducer } from "@/widgets/header/ui/notifications";
import { createReducer } from "@/widgets/header/ui/create-btn";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    notif: notifReducer,
    create: createReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
