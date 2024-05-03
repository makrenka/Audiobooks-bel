import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "..";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks } from "@/store/books";
import { fetchUser } from "@/store/users";
import { highlightMatches } from "../services/highlightMatches";

import { Header } from "@/components/Header/Header";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { SearchPanel } from "@/components/SearchPanel/SearchPanel";
import { Loader } from "@/components/Loader/Loader";

import styles from "./page.module.css";

export default function LibraryPage() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const handleHighlight = (string: string) => highlightMatches(value, string);
  const { data: books, isLoading } = useAppSelector(
    (state) => state.book.bookList
  );
  const user = useAppSelector((state) => state.user.user.data);
  console.log(user);

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

  const onValueChange = (value: string) => {
    setValue(value);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | бібліятэка"} />
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <SearchPanel onValueChange={onValueChange} />
          {user && user.books.length ? (
            <div className={styles.cards}>
              {books
                ?.filter(
                  (item) =>
                    item.title.toLowerCase().includes(value) ||
                    item.author.toLowerCase().includes(value)
                )
                .filter((item) => user?.books.includes(item._id))
                .map(({ cover, title, author, _id }) => (
                  <Link
                    href={`/books/${_id}`}
                    key={_id}
                    className={styles.cardLink}
                  >
                    <div className={styles.card} key={_id}>
                      <img
                        src={
                          cover
                            ? "http://localhost:5000/" + cover
                            : "no-image.png"
                        }
                        alt="Cover of the book"
                        className={styles.cardImg}
                      />
                      <div className={styles.cardDescr}>
                        <h3 className={styles.cardHeading}>
                          {handleHighlight(title)}
                        </h3>
                        <p className={styles.cardAuthor}>
                          {handleHighlight(author)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <p className={styles.message}>
              {user?.books.length
                ? "Аўтарызуйцеся, каб убачыць сьпіс вашых кніг"
                : "У вашай бібліятэцы пакуль што няма кніг"}
            </p>
          )}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
