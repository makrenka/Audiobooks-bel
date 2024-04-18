import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

import { deleteBook } from "@/store/books";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import styles from "./BookModalSettings.module.css";

export const BookModalSettings = () => {
  const dispatch = useAppDispatch();
  const modal = useRef(document.createElement("div"));
  const user = useAppSelector((state) => state.user.user.data);
  const router = useRouter();
  const { id } = router.query;

  const token = localStorage.getItem("token") as string;
  const cookie = Cookies.get("access_token") as string;

  useEffect(() => {
    const { current } = modal;
    document.body.appendChild(current);
    return () => {
      document.body.removeChild(current);
    };
  }, []);

  const deleteItem = () => {
    let confirmed = confirm("Вы сапраўды хочаце выдаліць гэтую кнігу?");
    if (confirmed && token) dispatch(deleteBook({ id, token }));
    if (confirmed && cookie) dispatch(deleteBook({ id, cookie }));
    router.push("/admin");
  };

  return (
    <div className={styles.modal}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href={"/"} className={styles.reviewLink}>
            Пакінуць водгук
          </Link>
        </li>
        {user?.roles.map((item) => item.value).includes("ADMIN") && (
          <li className={styles.item}>
            <button className={styles.deleteBtn} onClick={deleteItem}>
              Выдаліць з каталёгу
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
