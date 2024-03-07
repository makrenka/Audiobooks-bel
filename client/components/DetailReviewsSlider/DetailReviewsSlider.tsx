"use client";

import { TouchEvent, useState } from "react";
import { SlidesList } from "./SlidesList";
import { Dots } from "./Dots";

import styles from "./DetailReviewsSlider.module.css";

type Reviews = {
  id: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const DetailReviewsSlider = ({
  onSlider,
  reviews,
}: {
  onSlider: () => void;
  reviews: Reviews[];
}) => {
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = 0;
    } else if (slide + direction <= (reviews || "").length - 1) {
      slideNumber = slide + direction;
    } else {
      slideNumber = (reviews || "").length - 1;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (number: number) => {
    setSlide(number);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchPosition === null) return;

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SlidesList reviews={reviews} slideNumber={slide} />
      <div className={styles.dotsWrapper}>
        <Dots reviews={reviews} slideNumber={slide} goToSlide={goToSlide} />
        <button className={styles.moreBtn} onClick={() => onSlider()}>
          View More
        </button>
      </div>
    </div>
  );
};
