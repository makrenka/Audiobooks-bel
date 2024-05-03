import Link from "next/link";

import { RatingGroup } from "../RatingGroup/RatingGroup";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "../Loader/Loader";

import styles from "./BestSellerCardsGroup.module.css";

export const BestSellerCardsGroup = ({ section }: { section: string }) => {
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );

  if (isLoading) return <Loader />;

  return (
    <div className={styles.cards}>
      {books
        ?.filter((item) => item.sections.map((i) => i.name).includes(section))
        .map(({ cover, title, author, listens, _id, reviews }) => (
          <div className={styles.card} key={_id}>
            <Link href={`/books/${_id}`}>
              <img
                src={cover ? "http://localhost:5000/" + cover : "/no-image.png"}
                alt="Cover of the book"
                className={styles.img}
              />
            </Link>
            <div className={styles.description}>
              <Link href={`/books/${_id}`} className={styles.link}>
                <h3 className={styles.heading}>{title}</h3>
              </Link>
              <p className={styles.author}>{author}</p>
              <div className={styles.ratingWrapper}>
                <RatingGroup reviews={reviews} />
              </div>
              <p className={styles.counter}>{listens} Listeners</p>
            </div>
          </div>
        ))}
    </div>
  );
};
