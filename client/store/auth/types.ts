type BaseState = {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  auth: BaseState & {
    isError: boolean;
    userData: User | null;
  };
  register: BaseState;
  forgot: BaseState;
  createPassword: BaseState;
};

export type User = {
  id: string;
  email: string;
  dateBirthday: Date;
};

export type AuthResponse = {
  token: string;
  user: User;
};
