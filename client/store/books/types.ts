export type Book = {
  cover: {
    url: string;
  };
  coverBigSize: {
    url: string;
  };
  title: string;
  author: string;
  listeners: string;
  id: string;
  audio: string;
  section: string[];
  category: string[];
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
    isError: boolean;
    data: Book[] | null;
  };
};
