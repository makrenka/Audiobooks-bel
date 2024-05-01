import { useEffect } from "react";
import { fetchBooks } from "@/store/books";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/pages";
import { fetchUser } from "@/store/users";
import Cookies from "js-cookie";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import styles from "./LatestSearchCardsGroup.module.css";

export const LatestSearchCardsGroup = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.book.bookList.data);
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

  return (
    <section className={styles.latestSearch}>
      <h2 className={styles.heading}>Раней вы слухалі</h2>
      <div className={styles.cards}>
        {books
          ?.filter((item) => user?.books.includes(item._id))
          .map(({ cover, title, _id }) => (
            <div className={styles.card} key={_id}>
              <img
                src={cover ? "http://localhost:5000/" + cover : "no-image.png"}
                alt="Cover of the book"
                className={styles.img}
              />
              <h3 className={styles.cardheading}>{title}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};
