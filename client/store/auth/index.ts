import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, AuthState, UserAuth } from "./types";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export const registration = createAsyncThunk(
  "auth/registration",
  async (userData: UserAuth, { rejectWithValue }) => {
    try {
      const { email, password } = userData;

      const response: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:5000/auth/registration",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      return jwtDecode(response.data.token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  auth: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    userData: null,
  },
  register: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  forgot: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  createPassword: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.register.isLoading = true;
        state.register.isSuccess = false;
        state.register.errorMessage = "";
      })
      .addCase(registration.fulfilled, (state) => {
        state.register.isLoading = false;
        state.register.isSuccess = true;
        state.register.errorMessage = "";
      })
      .addCase(registration.rejected, (state, action: PayloadAction<any>) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.errorMessage = action.payload;
      });
  },
});

export const { setAuthenticated } = authSlice.actions;
