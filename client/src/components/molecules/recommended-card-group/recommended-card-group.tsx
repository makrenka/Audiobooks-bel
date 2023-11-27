import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import noImage from "./assets/No-Image-Available-200x300.jpg";

import "./recommended-card-group.css";

export const RecommendedCardGroup = () => {
  const books = useSelector((state: RootState) => state.books.bookList.data);

  return (
    <div className="recommended-home__images">
      {books?.map(({ coverBigSize, id }) => (
        <Link to={"detail/" + id} key={id}>
          <img
            src={coverBigSize.url ? coverBigSize.url : noImage}
            alt="Cover of the book"
            className="recommended-home__img"
          />
        </Link>
      ))}
    </div>
  );
};
