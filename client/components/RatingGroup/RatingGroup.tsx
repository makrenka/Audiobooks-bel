"use client";
import { useEffect, useState } from "react";
import styles from "./RatingGroup.module.css";
import { RatingStar } from "../RatingStar/RatingStar";

type Review = {
  number: number;
  image: {
    url: string;
  };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const RatingGroup = ({ reviews }: { reviews: Review[] | undefined }) => {
  const [stars, setStars] = useState<{ id: number; filling: number }[]>([
    { id: 1, filling: 0 },
    { id: 2, filling: 0 },
    { id: 3, filling: 0 },
    { id: 4, filling: 0 },
    { id: 5, filling: 0 },
  ]);
  const ratingNumber = reviews?.length
    ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews?.length
    : 0;

  const changeFilling = () => {
    const fillingStars = stars.map((star, index) => {
      let rating = ratingNumber;
      if (star.filling < rating - index - 1) {
        return { ...star, filling: 100 };
      } else {
        return { ...star, filling: Math.floor((rating - index) * 100) };
      }
    });

    return fillingStars;
  };

  useEffect(() => {
    setStars(changeFilling());
  }, [ratingNumber]);

  return (
    <div className={styles.ratingGroup}>
      {stars.map(({ filling, id }) => (
        <RatingStar filling={filling} key={id} />
      ))}
    </div>
  );
};
