import Link from "next/link";

import { highlightMatches } from "@/pages/services/highlightMatches";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "../Loader/Loader";

import styles from "./SearchResults.module.css";

export const SearchResults = ({ value }: { value: string }) => {
  const handleHighlight = (string: string) => highlightMatches(value, string);
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );

  if (isLoading) return <Loader />;

  return (
    <section className={styles.results}>
      <h2 className={styles.heading}>Search Results</h2>
      <div className={styles.cards}>
        {books
          ?.filter(
            (item) =>
              item.title.toLowerCase().includes(value) ||
              item.author.toLowerCase().includes(value)
          )
          .map(({ cover, title, author, _id }) => (
            <Link href={`/books/${_id}`} key={_id} className={styles.cardLink}>
              <div className={styles.card} key={_id}>
                <img
                  src={
                    cover ? "http://localhost:5000/" + cover : "no-image.png"
                  }
                  alt="Cover of the book"
                  className={styles.cardImg}
                />
                <h3 className={styles.cardHeading}>{handleHighlight(title)}</h3>
                <p className={styles.cardAuthor}>{handleHighlight(author)}</p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};
