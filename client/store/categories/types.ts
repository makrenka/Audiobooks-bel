export type Category = {
  _id: string;
  name: string;
};

export type CategoriesState = {
  categoriesList: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: Category[] | null;
  };
};
