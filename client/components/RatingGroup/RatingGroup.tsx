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

export const RatingGroup = ({ reviews }: { reviews: Review[] }) => {
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
    //   let rating = ratingNumber;
    //   for (let i = 0; i < ratingNumber; i++) {
    //     let star = stars[i];
    //     if (i <= ratingNumber - 1) {
    //       star.filling = 100;
    //       rating--;
    //     } else {
    //       star.filling = Math.floor(rating * 100);
    //     }
    //   }

    //   return stars;

    const fillingStars = stars.map((star, index) => {
      let rating = ratingNumber;
      if (star.filling < rating - index) {
        console.log(index);
        return { ...star, filling: 100 };
      } else {
        return { ...star, filling: Math.floor(rating * 100) };
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
