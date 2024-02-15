import { audiobooks } from "@/constants/audiobooks";

import styles from "./LatestSearchCardsGroup.module.css";

export const LatestSearchCardsGroup = () => (
  <section className={styles.latestSearch}>
    <h2 className={styles.heading}>Апошні пошук</h2>
    <div className={styles.cards}>
      {audiobooks.map(({ cover, title, id }) => (
        <div className={styles.card} key={id}>
          <img src={cover.url} alt="Cover of the book" className={styles.img} />
          <h3 className={styles.cardheading}>{title}</h3>
        </div>
      ))}
    </div>
  </section>
);
