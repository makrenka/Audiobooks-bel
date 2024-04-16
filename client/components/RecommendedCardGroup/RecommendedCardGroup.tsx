import Link from "next/link";

import { useAppSelector } from "@/store/hooks";

import styles from "./RecommendedCardGroup.module.css";

export const RecommendedCardGroup = () => {
  const { bookList } = useAppSelector((state) => state.book);
  const user = useAppSelector((state) => state.user.user.data);

  const userGenres = user?.categories.map((item) => item.name);

  const filteredBooks = bookList.data?.filter((book) =>
    book.categories
      .map((i) => i.name)
      .some((genre) => userGenres?.includes(genre))
  );

  return (
    <div className={styles.images}>
      {filteredBooks?.length ? (
        filteredBooks.map(({ coverBigSize, _id }) => (
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
        ))
      ) : (
        <p className={styles.text}>Аўтарызуйцеся ці абярыце жанры ў наладах</p>
      )}
    </div>
  );
};
