type BaseState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  auth: BaseState;
  register: BaseState;
  forgot: BaseState;
};

export type UserAuth = {
  email: string;
  password?: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
  user: UserAuth;
};
