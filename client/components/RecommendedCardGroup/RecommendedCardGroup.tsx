import Link from "next/link";
import Cookies from "js-cookie";

import { useAppSelector } from "@/store/hooks";
import { Loader } from "../Loader/Loader";

import styles from "./RecommendedCardGroup.module.css";
import { useEffect, useState } from "react";

export const RecommendedCardGroup = () => {
  const [token, setToken] = useState("");
  const [cookie, setCookie] = useState("");
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );
  const user = useAppSelector((state) => state.user.user.data);

  const userGenres = user?.categories.map((item) => item.name);

  const filteredBooks = books?.filter((book) =>
    book.categories
      .map((i) => i.name)
      .some((genre) => userGenres?.includes(genre))
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cookie = Cookies.get("access_token");
    setToken(token || "");
    setCookie(cookie || "");
  }, []);

  if (isLoading) return <Loader />;

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
        <p className={styles.text}>
          {!token && !cookie ? (
            <span>
              <Link href={"/auth/login"}>Аўтарызуйцеся,</Link> каб убачыць кнігі
              ў вашых жанрах
            </span>
          ) : (
            <span>
              <Link href={"/personalization"}>Абярыце</Link> жанры, каб убачыць
              тут кнігі
            </span>
          )}
        </p>
      )}
    </div>
  );
};
