import { configureStore } from "@reduxjs/toolkit";

import books from "../store/books/index";

export const store = configureStore({
  reducer: { books },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
