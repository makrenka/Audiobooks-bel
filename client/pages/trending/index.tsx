import { useEffect } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/store/books";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";

import styles from "../recommended/page.module.css";

export default function TrendingPage() {
  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <NextSeo title={"Аўдыёкнігі - папулярнае"} />
      <div className={styles.container}>
        <HeaderSection heading={"Папулярнае"} />
        <main className={styles.main}>
          {bookList.data
            ?.filter((item) =>
              item.sections.map((i) => i.name).includes("trending")
            )
            .map(({ cover, title, author, _id }) => (
              <Link
                href={`/books/${_id}`}
                key={_id}
                className={styles.cardLink}
              >
                <div className={styles.card}>
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
              </Link>
            ))}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
