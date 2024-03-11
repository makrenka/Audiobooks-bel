import { useAppSelector } from "@/store/hooks";
import { RatingGroup } from "../RatingGroup/RatingGroup";

import styles from "./DetailCard.module.css";

export const DetailCard = () => {
  const { book } = useAppSelector((state) => state.book);

  const reviews = book.data?.reviews;
  const ratingNumber = reviews?.length
    ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews?.length
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={book.data?.cover}
          alt="Book cover"
          className={styles.cardImg}
        />
      </div>
      <h2 className={styles.heading}>{book.data?.title}</h2>
      <p className={styles.author}>{book.data?.author}</p>
      <div className={styles.ratingWrapper}>
        <RatingGroup reviews={reviews} />
        <p className={styles.ratingNumber}>{ratingNumber?.toFixed(1)}</p>
      </div>
    </div>
  );
};
