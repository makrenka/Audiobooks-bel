"use client";
import { audiobooks } from "@/constants/audiobooks";
import { RatingGroup } from "../RatingGroup/RatingGroup";

import styles from "./BestSellerCardsGroup.module.css";

export const BestSellerCardsGroup = ({ section }: { section: string }) => (
  <div className={styles.cards}>
    {audiobooks
      .filter((item) => item.section.includes(section))
      .map(({ cover, title, author, listeners, id, reviews }) => (
        <div className={styles.card} key={id}>
          <img
            src={cover.url ? cover.url : "/no-image.png"}
            alt="Cover of the book"
            className={styles.img}
          />
          <div className={styles.description}>
            <h3 className={styles.heading}>{title}</h3>
            <p className={styles.author}>{author}</p>
            <div className={styles.ratingWrapper}>
              <RatingGroup reviews={reviews} />
            </div>
            <p className={styles.counter}>{listeners}</p>
          </div>
        </div>
      ))}
  </div>
);
