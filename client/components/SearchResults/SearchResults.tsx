import { highlightMatches } from "@/app/services/highlightMatches";
import { audiobooks } from "@/constants/audiobooks";

import styles from "./SearchResults.module.css";

export const SearchResults = ({ value }: { value: string }) => {
  const handleHighlight = (string: string) => highlightMatches(value, string);

  return (
    <section className={styles.results}>
      <h2 className={styles.heading}>Search Results</h2>
      <div className={styles.cards}>
        {audiobooks
          .filter(
            (item) =>
              item.title.toLowerCase().includes(value) ||
              item.author.toLowerCase().includes(value)
          )
          .map(({ cover, title, author, id }) => (
            <div className={styles.card} key={id}>
              <img
                src={cover.url ? cover.url : "no-image.png"}
                alt="Cover of the book"
                className={styles.cardImg}
              />
              <h3 className={styles.cardHeading}>{handleHighlight(title)}</h3>
              <p className={styles.cardAuthor}>{handleHighlight(author)}</p>
            </div>
          ))}
      </div>
    </section>
  );
};
