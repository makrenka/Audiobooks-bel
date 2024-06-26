export type UserState = {
  user: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: User | null;
  };
  changePassword: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: User | null;
  };
};

export type User = {
  _id: string;
  name: string;
  email: string;
  img: string;
  books: string[];
  categories: { name: string }[];
  roles: { value: string }[];
};

export type AddCategoryUser = {
  userId: string | undefined;
  categories: string[];
};

export type ChangePassword = {
  userId: string | undefined;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};
