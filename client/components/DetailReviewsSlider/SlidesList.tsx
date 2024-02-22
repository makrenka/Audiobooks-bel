import { Slide } from "./Slide";

import styles from "./DetailReviewsSlider.module.css";

type Reviews = {
  number: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const SlidesList = ({
  slideNumber,
  reviews,
}: {
  slideNumber: number;
  reviews: Reviews[];
}) => (
  <div
    className={styles.slidesList}
    style={{ transform: `translateX(-${slideNumber * 100}%)` }}
  >
    <Slide reviews={reviews} />
  </div>
);
