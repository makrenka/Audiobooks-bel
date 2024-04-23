import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesState, Category } from "./types";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/books/categories"
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: CategoriesState = {
  categoriesList: {
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  },
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesList.isLoading = true;
        state.categoriesList.isSuccess = false;
        state.categoriesList.error = null;
        state.categoriesList.data = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categoriesList.isLoading = false;
          state.categoriesList.isSuccess = true;
          state.categoriesList.error = null;
          state.categoriesList.data = action.payload;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.categoriesList.isLoading = false;
          state.categoriesList.isSuccess = false;
          state.categoriesList.error = action.payload;
          state.categoriesList.data = null;
        }
      );
  },
});
