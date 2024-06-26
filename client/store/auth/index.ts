import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, AuthState, UserAuth } from "./types";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export const registration = createAsyncThunk(
  "auth/registration",
  async (userData: UserAuth, { rejectWithValue }) => {
    try {
      const { email, password, name } = userData;

      const { data }: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:5000/auth/registration",
        { email, password, name }
      );

      if (!data) {
        throw new Error("Can't registry, server error!");
      }

      localStorage.setItem("token", data.token);

      return jwtDecode(data.token);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: UserAuth, { rejectWithValue }) => {
    try {
      const { email, password, remember } = userData;

      const { data }: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password, remember }
      );

      if (!data) {
        throw new Error("Can't login, server error!");
      }

      localStorage.setItem("token", data.token);

      return jwtDecode(data.token);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgot = createAsyncThunk(
  "auth/forgot",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/forgotten-password",
        { email }
      );

      if (!data) {
        throw new Error("Can't create password, server error!");
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
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
  },
  register: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  forgot: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  google: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    data: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setForgotDefault: (state) => {
      state.forgot.isLoading = false;
      state.forgot.isSuccess = false;
      state.forgot.isError = false;
      state.forgot.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.register.isLoading = true;
        state.register.isSuccess = false;
        state.register.isError = false;
        state.register.errorMessage = "";
      })
      .addCase(registration.fulfilled, (state) => {
        state.register.isLoading = false;
        state.register.isSuccess = true;
        state.register.isError = false;
        state.register.errorMessage = "";
        state.isAuthenticated = true;
      })
      .addCase(registration.rejected, (state, action: PayloadAction<any>) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.isError = true;
        state.register.errorMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.auth.isLoading = true;
        state.auth.isSuccess = false;
        state.auth.isError = false;
        state.auth.errorMessage = "";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.auth.isLoading = false;
        state.auth.isSuccess = true;
        state.auth.isError = false;
        state.auth.errorMessage = "";
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.auth.isLoading = false;
        state.auth.isSuccess = false;
        state.auth.isError = true;
        state.auth.errorMessage = action.payload;
      })
      .addCase(forgot.pending, (state) => {
        state.forgot.isLoading = true;
        state.forgot.isSuccess = false;
        state.forgot.isError = false;
        state.forgot.errorMessage = "";
      })
      .addCase(forgot.fulfilled, (state, action: PayloadAction<any>) => {
        state.forgot.isLoading = false;
        state.forgot.isSuccess = true;
        state.forgot.isError = false;
        state.forgot.errorMessage = "";
      })
      .addCase(forgot.rejected, (state, action: PayloadAction<any>) => {
        state.forgot.isLoading = false;
        state.forgot.isSuccess = false;
        state.forgot.isError = true;
        state.forgot.errorMessage = action.payload;
      });
  },
});

export const { setAuthenticated, setForgotDefault } = authSlice.actions;
