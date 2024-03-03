import classNames from "classnames";
import styles from "./DetailControlButtons.module.css";
import { useAppDispatch } from "@/store/hooks";
import { setShowMiniPlayer } from "@/store/player";

export const DetailControlButtons = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={classNames(styles.btn, styles.btnPlay)}
        onClick={() => dispatch(setShowMiniPlayer())}
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
