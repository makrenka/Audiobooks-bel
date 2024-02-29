import Link from "next/link";

import { audiobooks } from "@/constants/audiobooks";

import styles from "./RecommendedCardGroup.module.css";

export const RecommendedCardGroup = () => (
  <div className={styles.images}>
    {audiobooks.map(({ coverBigSize, id }) => (
      <Link href={`/books/${id}`} key={id}>
        <img
          src={
            coverBigSize.url
              ? coverBigSize.url
              : "/No-Image-Available-200x300.jpg"
          }
          alt="Cover of the book"
          className={styles.img}
        />
      </Link>
    ))}
  </div>
);
