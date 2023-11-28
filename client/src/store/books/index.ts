import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BooksType } from "./types";
import { BookListItem } from "./types";
import { useHttp } from "../../hooks/use.http.hook";

const initialState: BooksType = {
  bookList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
  },
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/api/books");
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // booksListRequest: (state) => {
    //   state.bookList.isLoading = true;
    // },
    // booksListRequestSuccess: (state, action: PayloadAction<BookListItem[]>) => {
    //   state.bookList.isLoading = false;
    //   state.bookList.isError = false;
    //   state.bookList.isSuccess = true;
    //   state.bookList.data = action.payload;
    // },
    // booksListRequestError: (state) => {
    //   state.bookList.isLoading = false;
    //   state.bookList.isError = true;
    //   state.bookList.isSuccess = false;
    //   state.bookList.data = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.bookList.isLoading = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<BookListItem[]>) => {
          state.bookList.isLoading = false;
          state.bookList.isSuccess = true;
          state.bookList.isError = false;
          state.bookList.data = action.payload;
        }
      )
      .addCase(fetchBooks.rejected, (state) => {
        state.bookList.isError = true;
        state.bookList.isLoading = false;
        state.bookList.isSuccess = false;
        state.bookList.data = null;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = booksSlice;

export default reducer;

export const {
  // booksListRequest,
  // booksListRequestSuccess,
  // booksListRequestError,
} = actions;
