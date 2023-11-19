import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { audiobooks } from "../../../constants/audiobooks";
import { fetchBooks } from "../../../store/books";

import "./recommended-card-group.css";

export const RecommendedCardGroup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="recommended-home__images">
      {audiobooks.map(({ coverBigSize, id }) => (
        <Link to={"detail/" + id} key={id}>
          <img
            src={coverBigSize}
            alt="Cover of the book"
            className="recommended-home__img"
          />
        </Link>
      ))}
    </div>
  );
};
