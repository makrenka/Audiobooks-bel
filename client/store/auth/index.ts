import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

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
  reducers: {},
});
