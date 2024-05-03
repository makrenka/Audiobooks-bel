import Link from "next/link";

import { useAppSelector } from "@/store/hooks";
import { Loader } from "../Loader/Loader";

import styles from "../NewAndTrendCardsGroup/NewAndTrendCardsGroup.module.css";

export const AllBooksCardsGroup = ({ section }: { section: string }) => {
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );

  if (isLoading) return <Loader />;

  return (
    <div className={styles.cards}>
      {books?.map(({ cover, title, _id }) => (
        <Link href={`/books/${_id}`} className={styles.link} key={_id}>
          <div className={styles.card}>
            <img
              src={cover ? "http://localhost:5000/" + cover : "/no-image.png"}
              alt="Cover of the book"
              className={styles.img}
            />
            <h3 className={styles.heading}>{title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
