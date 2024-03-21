export type UserState = {
  user: {
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
  books: { title: string }[];
  categories: { name: string }[];
  roles: { value: string }[];
};

export type AddCategoryUser = {
  userId: string;
  name: string[];
};
