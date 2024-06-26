import Link from "next/link";

import { useAppSelector } from "@/store/hooks";
import { Loader } from "../Loader/Loader";

import styles from "../LatestSearchCardsGroup/LatestSearchCardsGroup.module.css";

export const SelectedCategoryCardsGroup = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );

  if (isLoading) return <Loader />;

  return (
    <section className={styles.latestSearch}>
      <h2 className={styles.heading}>Кнігі катэгорыі "{selectedCategory}"</h2>
      <div className={styles.cards}>
        {books
          ?.filter((item) =>
            item.categories.map((i) => i.name).includes(selectedCategory)
          )
          .map(({ cover, title, _id }) => (
            <Link href={`/books/${_id}`} key={_id} className={styles.cardLink}>
              <div className={styles.card} key={_id}>
                <img
                  src={
                    cover ? "http://localhost:5000/" + cover : "no-image.png"
                  }
                  alt="Cover of the book"
                  className={styles.img}
                />
                <h3 className={styles.cardheading}>{title}</h3>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};
