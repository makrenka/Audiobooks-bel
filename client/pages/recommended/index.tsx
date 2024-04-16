import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { audiobooks } from "@/constants/audiobooks";

import styles from "./page.module.css";
import { Metadata } from "next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBooks } from "@/store/books";

export const metadata: Metadata = {
  title: "Аўдыёкнігі - рэкамендавана для вас",
};

export default function RecommendedPage() {
  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Рэкамендавана для вас"} />
        <main className={styles.main}>
          {bookList.data
            ?.filter((item) =>
              item.sections.map((i) => i.name).includes("recommended")
            )
            .map(({ cover, title, author }) => (
              <div className={styles.card} key={title}>
                <img
                  src={
                    cover ? "http://localhost:5000/" + cover : "no-image.png"
                  }
                  alt="Cover of the book"
                  className={styles.img}
                />
                <h3 className={styles.heading}>{title}</h3>
                <p className={styles.author}>{author}</p>
              </div>
            ))}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
