import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "@/widgets/side-menu/model";
import { notifReducer } from "@/widgets/header/ui/notifications/model";
import { createReducer } from "@/widgets/header/ui/create-btn/model";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    notif: notifReducer,
    create: createReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
