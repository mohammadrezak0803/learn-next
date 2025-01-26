import { configureStore } from "@reduxjs/toolkit";
import userinfoSlice from "./user/userinfoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// تعریف RootState
export const store = configureStore({
  reducer: {
    user: userinfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;