import classNames from "classnames";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { playBook, setActive } from "@/store/player";
import { Book } from "@/store/books/types";

import styles from "./DetailControlButtons.module.css";

export const DetailControlButtons = ({ book }: { book: Book }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user.data);
  const activePlayer = useAppSelector((state) => state.player.active);

  const play = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      dispatch(setActive(book));
      dispatch(playBook());
      axios.post(`http://localhost:5000/books/listen/${book._id}`);
      if (!user?.books.includes(book._id) && !activePlayer) {
        axios.post(
          "http://localhost:5000/users/book",
          {
            userId: user?._id,
            bookId: book._id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={classNames(styles.btn, styles.btnPlay)}
        onClick={play}
      >
        <img
          src="/icons/audio-play-button.svg"
          alt="Play Audio"
          className={styles.icon}
        />
        Слухаць аўдыё
      </button>
      <button type="button" className={classNames(styles.btn, styles.btnRead)}>
        <img
          src="/icons/read-book-button.svg"
          alt="Read Book"
          className={styles.icon}
        />
        Чытаць кнігу
      </button>
    </div>
  );
};
