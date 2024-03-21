import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import user from "@/lib/store/slices/user";
import room from "@/lib/store/slices/room";
import notification from "@/lib/store/slices/notification";

const store = configureStore({
  reducer: {
    user,
    room,
    notification,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
