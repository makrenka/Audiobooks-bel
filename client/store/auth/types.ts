import { User } from "../users/types";

type BaseState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
  auth: BaseState;
  register: BaseState;
  forgot: BaseState;
  google: BaseState & {
    data: User | null;
  };
};

export type UserAuth = {
  email: string;
  password?: string;
  name?: string;
  remember?: boolean;
};

export type AuthResponse = {
  token: string;
  user: UserAuth;
};
