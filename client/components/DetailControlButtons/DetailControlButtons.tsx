import classNames from "classnames";
import styles from "./DetailControlButtons.module.css";

export const DetailControlButtons = () => (
  <div className={styles.buttons}>
    <button type="button" className={classNames(styles.btn, styles.btnPlay)}>
      <img
        src="icons/audio-play-button.svg"
        alt="Play Audio"
        className={styles.icon}
      />
      Play Audio
    </button>
    <button type="button" className={classNames(styles.btn, styles.btnRead)}>
      <img
        src="icons/read-book-button.svg"
        alt="Read Book"
        className={styles.icon}
      />
      Read Book
    </button>
  </div>
);
