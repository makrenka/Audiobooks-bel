import classNames from "classnames/bind";

import styles from "./DetailReviewsSlider.module.css";

const cx = classNames.bind(styles);

type Reviews = {
  number: number;
  image: { url: string };
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const Dots = ({
  slideNumber,
  goToSlide,
  reviews,
}: {
  slideNumber: number;
  goToSlide: (number: number) => void;
  reviews: Reviews[];
}) => {
  const renderDots = () => {
    const dots = [];
    const countSlides = reviews?.length || 0;
    for (let i = 0; i < countSlides; i++) {
      dots.push(
        <div
          key={i}
          className={cx({
            dot: true,
            selected: slideNumber === i,
          })}
          onClick={() => goToSlide(i)}
        />
      );
    }

    return dots;
  };

  return <div className={styles.dots}>{renderDots()}</div>;
};
