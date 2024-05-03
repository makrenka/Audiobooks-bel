import { useEffect } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/store/books";
import { fetchUser } from "@/store/users";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { Loader } from "@/components/Loader/Loader";

import styles from "./page.module.css";

export type JwtPayload = {
  id: string;
};

export default function RecommendedPage() {
  const dispatch = useAppDispatch();
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );
  const user = useAppSelector((state) => state.user.user.data);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id } = jwtDecode(token || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  useEffect(() => {
    const cookie = Cookies.get("access_token");
    if (cookie) {
      const { id } = jwtDecode(cookie || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  const userGenres = user?.categories.map((item) => item.name);

  const filteredBooks = books?.filter((book) =>
    book.categories
      .map((i) => i.name)
      .some((genre) => userGenres?.includes(genre))
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <NextSeo title={"Аўдыёкнігі - рэкамендавана для вас"} />
      <div className={styles.container}>
        <HeaderSection heading={"Рэкамендавана для вас"} />
        <main className={styles.main}>
          {filteredBooks?.length ? (
            filteredBooks.map(({ cover, title, author, _id }) => (
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
            ))
          ) : (
            <p className={styles.text}>
              Аўтарызуйцеся ці абярыце жанры ў наладах
            </p>
          )}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
