"use client";
import { RatingGroup } from "../RatingGroup/RatingGroup";
import styles from "./DetailCard.module.css";

type Reviews = {
  id: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const DetailCard = ({
  cover,
  title,
  author,
  reviews,
}: {
  cover: string;
  title: string;
  author: string;
  reviews: Reviews[];
}) => {
  const ratingNumber = reviews?.length
    ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews?.length
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={cover} alt="Book cover" className={styles.cardImg} />
      </div>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.author}>{author}</p>
      <div className={styles.ratingWrapper}>
        <RatingGroup reviews={reviews} />
        <p className={styles.ratingNumber}>{ratingNumber?.toFixed(1)}</p>
      </div>
    </div>
  );
};
