"use client";
import { RatingGroupDetail } from "../RatingGroupDetail/RatingGroupDetail";
import styles from "./DetailReviewsSlider.module.css";

type Review = {
  id: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const Slide = ({ review }: { review: Review }) => {
  const { id, image, name, date, text, rating } = review;

  return (
    <>
      <div className={styles.slide} key={id}>
        <div className={styles.slideWrapper}>
          <img src={image.url} alt="avatar" className={styles.slideImg} />
          <div className={styles.slideInfo}>
            <h3 className={styles.slideInfoName}>{name}</h3>
            <div className={styles.slideInfoRating}>
              <RatingGroupDetail rating={rating} />
              <p className={styles.reviewDate}>{date}</p>
            </div>
          </div>
        </div>
        <p className={styles.reviewText}>{text}</p>
      </div>
    </>
  );
};
