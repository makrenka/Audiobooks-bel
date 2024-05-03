import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/store/books";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { Loader } from "@/components/Loader/Loader";

import styles from "./page.module.css";

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | адміністраваньне"} />
      <div className={styles.container}>
        <HeaderSection heading={"Адміністраваньне"} />
        <main className={styles.main}>
          <button
            className={styles.addBtn}
            onClick={() => router.push("/add-book")}
          >
            Дадаць новую кнігу
          </button>
          {books?.map(({ cover, title, author, _id }) => (
            <Link href={`/books/${_id}`} key={_id} className={styles.cardLink}>
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
    </>
  );
}
