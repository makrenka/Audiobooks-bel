import { audiobooks } from "../../../constants/audiobooks";
import "./best-seller-cards-group.css";

export const BestSellerCardsGroup = ({ section }: { section: string }) => (
  <div className="best-seller-home__cards">
    {audiobooks
      .filter((item) => item.section.includes(section))
      .map(({ cover, title, author, rating, listeners, id }) => (
        <div className="best-seller-home__card" key={id}>
          <img
            src={cover}
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
              src={rating}
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
