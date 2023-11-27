export type BooksType = {
  bookList: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: null | BookListItem[];
  };
};

export type BookListItem = {
  cover: {
    url: string;
  };
  coverBigSize: {
    url: string;
  };
  title: string;
  author: string;
  ratingNumber: number;
  listeners: string;
  id: string;
  section: string[];
  category: string[];
  reviews: [
    {
      number: number;
      image: {
        url: string;
      };
      name: string;
      rating: number;
      date: string;
      text: string;
    },
  ];
  summary: string;
};
