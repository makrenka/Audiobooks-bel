import { Book } from "@/store/books/types";
import { RatingGroup } from "../RatingGroup/RatingGroup";

import styles from "./DetailCard.module.css";

export const DetailCard = ({ book }: { book: Book }) => {
  const reviews = book.reviews;
  const ratingNumber = reviews?.length
    ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews?.length
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={"http://localhost:5000/" + book.cover}
          alt="Book cover"
          className={styles.cardImg}
        />
      </div>
      <h2 className={styles.heading}>{book.title}</h2>
      <p className={styles.author}>{book.author}</p>
      <div className={styles.ratingWrapper}>
        <RatingGroup reviews={reviews} />
        <p className={styles.ratingNumber}>{ratingNumber?.toFixed(1)}</p>
      </div>
    </div>
  );
};
