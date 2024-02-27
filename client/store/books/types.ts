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
  section: string[];
  category: string[];
  reviews: [
    {
      id: string;
      image: { url: string };
      name: string;
      rating: number;
      date: string;
      text: string;
    }
  ];
  summary: string;
};
