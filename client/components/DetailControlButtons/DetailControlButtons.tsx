import classNames from "classnames";

import { useAppDispatch } from "@/store/hooks";
import { playBook, setActive } from "@/store/player";
import { Book } from "@/store/books/types";

import styles from "./DetailControlButtons.module.css";

export const DetailControlButtons = ({ book }: { book: Book }) => {
  const dispatch = useAppDispatch();

  const play = () => {
    dispatch(setActive(book));
    dispatch(playBook());
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
