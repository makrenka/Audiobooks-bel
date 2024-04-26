import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Section, SectionsState } from "./types";

export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/sections");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: SectionsState = {
  sectionsList: {
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  },
};

export const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.sectionsList.isLoading = true;
        state.sectionsList.isSuccess = false;
        state.sectionsList.error = null;
        state.sectionsList.data = null;
      })
      .addCase(
        fetchSections.fulfilled,
        (state, action: PayloadAction<Section[]>) => {
          state.sectionsList.isLoading = false;
          state.sectionsList.isSuccess = true;
          state.sectionsList.error = null;
          state.sectionsList.data = action.payload;
        }
      )
      .addCase(fetchSections.rejected, (state, action: PayloadAction<any>) => {
        state.sectionsList.isLoading = false;
        state.sectionsList.isSuccess = false;
        state.sectionsList.error = action.payload;
        state.sectionsList.data = null;
      });
  },
});
