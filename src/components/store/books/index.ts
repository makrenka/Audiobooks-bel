import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BooksType } from "./types";
import { BookListItem } from "./types";

const initialState: BooksType = {
  bookList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
  },
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    bookListRequest: (state) => {
      state.bookList.isLoading = true;
    },
    bookListRequestSuccess: (state, action: PayloadAction<BookListItem>) => {
      state.bookList.isLoading = false;
      state.bookList.isError = false;
      state.bookList.isSuccess = true;
      state.bookList.data = action.payload;
    },
  },
});
