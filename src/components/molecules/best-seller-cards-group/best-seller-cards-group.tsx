import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import "./best-seller-cards-group.css";

import noImage from "./assets/no-image.png";
import rating from "./assets/Rating.png";
import classNames from "classnames";

export const BestSellerCardsGroup = ({ section }: { section: string }) => {
  const books = useSelector((state: RootState) => state.books.bookList.data);

  return (
    <div className="best-seller-home__cards">
      {books
        ?.filter((item) => item.section.includes(section))
        .map(({ cover, title, author, listeners, id, ratingNumber }) => (
          <div className="best-seller-home__card" key={id}>
            <img
              src={cover.url ? cover.url : noImage}
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
              <div className="best-seller-home__card-description-rating-wrapper">
                {/* <img
                  src={rating}
                  alt="rating"
                  className={classNames(
                    'best-seller-home__card-description-rating',
                    `rating-${ratingNumber}`
                  )}
                /> */}
              </div>
              <p className="best-seller-home__card-description-listeners-counter">
                {listeners}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
