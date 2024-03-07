import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Book, BookState } from "./types";

const initialState: BookState = {
  bookList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
  },
};

export const bookSclice = createSlice({
  name: "book",
  initialState,
  reducers: {
    bookListRequest: (state) => {
      state.bookList.isLoading = true;
    },
    bookListRequestSuccess: (state, action: PayloadAction<Book[]>) => {
      state.bookList.isLoading = false;
      state.bookList.isSuccess = true;
      state.bookList.isError = false;
      state.bookList.data = action.payload;
    },
    bookListRequestError: (state) => {
      state.bookList.isLoading = false;
      state.bookList.isSuccess = false;
      state.bookList.isError = true;
      state.bookList.data = null;
    },
  },
});

export const { bookListRequest, bookListRequestSuccess, bookListRequestError } =
  bookSclice.actions;
