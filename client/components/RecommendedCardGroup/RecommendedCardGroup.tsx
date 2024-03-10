import Link from "next/link";

import { useAppSelector } from "@/store/hooks";

import styles from "./RecommendedCardGroup.module.css";

export const RecommendedCardGroup = () => {
  const { bookList } = useAppSelector((state) => state.book);

  return (
    <div className={styles.images}>
      {bookList.data?.map(({ coverBigSize, _id }) => (
        <Link href={`/books/${_id}`} key={_id}>
          <img
            src={
              coverBigSize
                ? "http://localhost:5000/" + coverBigSize
                : "/No-Image-Available-200x300.jpg"
            }
            alt="Cover of the book"
            className={styles.img}
          />
        </Link>
      ))}
    </div>
  );
};
