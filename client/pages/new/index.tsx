import { useEffect } from "react";
import { NextSeo } from "next-seo";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/store/books";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";

import styles from "../recommended/page.module.css";

export default function NewPage() {
  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <NextSeo title={"Аўдыёкнігі - навінкі"} />
      <div className={styles.container}>
        <HeaderSection heading={"Навінкі"} />
        <main className={styles.main}>
          {bookList.data
            ?.filter((item) => item.sections.map((i) => i.name).includes("new"))
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
