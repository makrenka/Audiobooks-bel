"use client";
import { useEffect, useState } from "react";
import { RatingStar } from "../RatingStar/RatingStar";

import styles from "./RatingGroupDetail.module.css";

export const RatingGroupDetail = ({ rating }: { rating: number }) => {
  const [stars, setStars] = useState<{ id: number; filling: number }[]>([
    { id: 1, filling: 0 },
    { id: 2, filling: 0 },
    { id: 3, filling: 0 },
    { id: 4, filling: 0 },
    { id: 5, filling: 0 },
  ]);

  const changeFilling = () => {
    const fillingStars = stars.map((star, index) => {
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
  }, [rating]);

  return (
    <div className={styles.ratingGroup}>
      {stars.map(({ filling, id }) => (
        <RatingStar filling={filling} key={id} />
      ))}
    </div>
  );
};
