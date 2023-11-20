import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import "./best-seller-cards-group.css";

import card1 from "./assets/card1.jpg";

export const BestSellerCardsGroup = ({ section }: { section: string }) => {
  const books = useSelector((state: RootState) => state.books.bookList.data);

  return (
    <div className="best-seller-home__cards">
      {books
        ?.filter((item) => item.section.includes(section))
        .map(({ cover, title, author, rating, listeners, id }) => (
          <div className="best-seller-home__card" key={id}>
            <img
              src={cover.url ? cover.url : card1}
              alt="Cover of the book"
              className="best-seller-home__card-img"
            />
            <div className="best-seller-home__card-description">
              <h3 className="best-seller-home__card-description-heading">
                {title}
              </h3>
              <p className="best-seller-home__card-description-author">
                {author}
              </p>
              <img
                src={rating.url}
                alt="rating"
                className="best-seller-home__card-description-rating"
              />
              <p className="best-seller-home__card-description-listeners-counter">
                {listeners}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
