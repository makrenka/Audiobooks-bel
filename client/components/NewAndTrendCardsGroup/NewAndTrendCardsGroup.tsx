import Link from "next/link";

import { useAppSelector } from "@/store/hooks";

import styles from "./NewAndTrendCardsGroup.module.css";

export const NewAndTrendCardsGroup = ({ section }: { section: string }) => {
  const { bookList } = useAppSelector((state) => state.book);

  return (
    <div className={styles.cards}>
      {bookList.data
        ?.filter((item) => item.sections.map((i) => i.name).includes(section))
        .map(({ cover, title, _id }) => (
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
