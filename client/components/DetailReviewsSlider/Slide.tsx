"use client";
import { RatingGroup } from "../RatingGroup/RatingGroup";
import styles from "./DetailReviewsSlider.module.css";

type Reviews = {
  number: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const Slide = ({ reviews }: { reviews: Reviews[] }) => (
  <>
    {reviews?.map(({ number, image, name, rating, date, text }) => (
      <div className={styles.slide} key={number}>
        <div className={styles.slideWrapper}>
          <img src={image.url} alt="avatar" className={styles.slideImg} />
          <div className={styles.slideInfo}>
            <h3 className={styles.slideInfoName}>{name}</h3>
            <div className={styles.slideInfoRating}>
              <RatingGroup reviews={reviews} />
              <p className={styles.reviewDate}>{date}</p>
            </div>
          </div>
        </div>
        <p className={styles.reviewText}>{text}</p>
      </div>
    ))}
  </>
);
