import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCategoryUser, ChangePassword, User, UserState } from "./types";
import axios, { AxiosResponse } from "axios";

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

export const addCategoryUser = createAsyncThunk(
  "user/addCategoryUser",
  async (body: AddCategoryUser, { rejectWithValue }) => {
    try {
      const { userId, categories } = body;

      const { data }: AxiosResponse<User> = await axios.post(
        "http://localhost:5000/users/category",
        { userId, categories }
      );

      if (!data) {
        throw new Error("Can't add category!");
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (body: ChangePassword, { rejectWithValue }) => {
    try {
      const { userId, oldPassword, newPassword, newPasswordRepeat } = body;

      const { data }: AxiosResponse<User> = await axios.post(
        "http://localhost:5000/users/change-password",
        { userId, oldPassword, newPassword, newPasswordRepeat }
      );

      if (!data) {
        throw new Error("Can't change password, server error!");
      }

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
      })
      .addCase(addCategoryUser.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(
        addCategoryUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user.isLoading = false;
          state.user.isSuccess = true;
          state.user.error = null;
          state.user.data = action.payload;
        }
      )
      .addCase(
        addCategoryUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.user.isLoading = false;
          state.user.isSuccess = false;
          state.user.error = action.payload;
          state.user.data = null;
        }
      )
      .addCase(changePassword.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user.isLoading = false;
          state.user.isSuccess = true;
          state.user.error = null;
          state.user.data = action.payload;
        }
      )
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.user.isLoading = false;
        state.user.isSuccess = false;
        state.user.error = action.payload;
        state.user.data = null;
      });
  },
});

export const { logoutUser } = userSlice.actions;
