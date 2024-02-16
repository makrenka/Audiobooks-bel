import { audiobooks } from "@/constants/audiobooks";

import styles from "./NewAndTrendCardsGroup.module.css";
import Link from "next/link";

export const NewAndTrendCardsGroup = ({ section }: { section: string }) => (
  <div className={styles.cards}>
    {audiobooks
      .filter((item) => item.section.includes(section))
      .map(({ cover, title, id }) => (
        <Link href={`${id}`} className={styles.link}>
          <div className={styles.card} key={id}>
            <img
              src={cover.url ? cover.url : "/no-image.png"}
              alt="Cover of the book"
              className={styles.img}
            />
            <h3 className={styles.heading}>{title}</h3>
          </div>
        </Link>
      ))}
  </div>
);
