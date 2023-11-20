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
  rating: {
    url: string;
  };
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
      rating: {
        url: string;
      };
      date: string;
      text: string;
    },
    {
      number: number;
      image: {
        url: string;
      };
      name: string;
      rating: {
        url: string;
      };
      date: string;
      text: string;
    },
    {
      number: number;
      image: {
        url: string;
      };
      name: string;
      rating: {
        url: string;
      };
      date: string;
      text: string;
    }
  ];
  summary: string;
};
