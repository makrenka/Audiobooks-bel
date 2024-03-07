import { Slide } from "./Slide";

import styles from "./DetailReviewsSlider.module.css";

type Reviews = {
  id: number;
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
    {reviews?.map((review) => (
      <Slide review={review} key={review.id} />
    ))}
  </div>
);
