"use client";
import { useState } from "react";

import { DetailReviewsSlider } from "../DetailReviewsSlider/DetailReviewsSlider";
import { Slide } from "../DetailReviewsSlider/Slide";

import styles from "./DetailReviews.module.css";

type Reviews = {
  number: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const DetailReviews = ({ reviews }: { reviews: Reviews[] }) => {
  const [slider, setSlider] = useState(true);

  const onSlider = () => {
    setSlider(false);
  };

  return (
    <div className={styles.reviews}>
      <h3 className={styles.heading}>Reviews</h3>
      {slider ? (
        <DetailReviewsSlider reviews={reviews} onSlider={onSlider} />
      ) : (
        <div className={styles.list}>
          <Slide reviews={reviews} />
        </div>
      )}
    </div>
  );
};
