import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Book, BookDeletePayload, BookState } from "./types";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/books");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (payload: BookDeletePayload, { rejectWithValue }) => {
    const { id, token, cookie } = payload;
    try {
      const response = await axios.delete(`http://localhost:5000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token ? token : cookie}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
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
  deleteBook: {
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
        state.bookList.isSuccess = false;
        state.bookList.error = null;
        state.bookList.data = null;
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
      })
      .addCase(deleteBook.pending, (state) => {
        state.deleteBook.isLoading = true;
        state.deleteBook.isSuccess = false;
        state.deleteBook.error = null;
        state.deleteBook.data = null;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.deleteBook.isLoading = false;
        state.deleteBook.isSuccess = true;
        state.deleteBook.error = null;
        state.deleteBook.data = action.payload;
      })
      .addCase(deleteBook.rejected, (state, action: PayloadAction<any>) => {
        state.deleteBook.isLoading = false;
        state.deleteBook.isSuccess = false;
        state.deleteBook.error = action.payload;
        state.deleteBook.data = null;
      });
  },
});
