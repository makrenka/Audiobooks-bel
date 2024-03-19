import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "./types";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserState = {
  user: {
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user.isLoading = false;
        state.user.isSuccess = true;
        state.user.error = null;
        state.user.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.user.isLoading = false;
        state.user.isSuccess = false;
        state.user.error = action.payload;
        state.user.data = null;
      });
  },
});

export const { logoutUser } = userSlice.actions;
