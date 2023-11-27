import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import books from "../store/books/index";

export const store = configureStore({
  reducer: { books },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;