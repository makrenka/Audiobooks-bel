export type Book = {
  cover: string;
  coverBigSize: string;
  title: string;
  author: string;
  listens: number;
  _id: string;
  audio: string;
  sections: {
    id: string;
    name: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
  reviews: {
    id: number;
    image: { url: string };
    name: string;
    rating: number;
    date: string;
    text: string;
  }[];
  summary: string;
};

export type BookState = {
  bookList: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: Book[] | null;
  };
  book: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: Book | null;
  };
  deleteBook: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: Book | null;
  };
};

export type BookDeletePayload = {
  id: string | string[] | undefined;
  token?: string;
  cookie?: string;
};

export type AddBookPayload = {
  title: string;
  author: string;
  summary: string;
  token?: string;
  cookie?: string;
};

export type AddCategoryBook = {
  bookId: string | undefined;
  categories: string[];
};
