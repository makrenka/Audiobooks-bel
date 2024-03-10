import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Book, BookState } from "./types";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/books");

      if (!response.ok) {
        throw new Error("Server error!");
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: BookState = {
  bookList: {
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  },
};

export const bookSclice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.bookList.isLoading = true;
        state.bookList.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.bookList.isLoading = false;
        state.bookList.isSuccess = true;
        state.bookList.error = null;
        state.bookList.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
        state.bookList.isLoading = false;
        state.bookList.isSuccess = false;
        state.bookList.error = action.payload;
        state.bookList.data = null;
      });
  },
});
