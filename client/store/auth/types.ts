type BaseState = {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  auth: BaseState & {
    isError: boolean;
    userData: UserAuth | null;
  };
  register: BaseState;
  forgot: BaseState;
  createPassword: BaseState;
};

export type UserAuth = {
  email: string;
  password?: string;
  dateBirthday?: Date;
};

export type AuthResponse = {
  token: string;
  user: UserAuth;
};
