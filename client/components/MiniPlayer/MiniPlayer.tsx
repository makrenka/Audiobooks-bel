import styles from "./MiniPlayer.module.css";

export const MiniPlayer = ({
  cover,
  title,
  author,
}: {
  cover: string;
  title: string;
  author: string;
}) => {
  return (
    <div className={styles.player}>
      <input type="range" className={styles.input} />
      <div className={styles.wrapper}>
        <img src={cover} alt="book's cover" className={styles.cover} />
        <div className={styles.info}>
          <h3 className={styles.heading}>{title}</h3>
          <p className={styles.author}>{author}</p>
        </div>
        <button className={styles.btnPlay}>
          <img
            src="icons/Play.svg"
            alt="play button"
            className={styles.btnPlayImg}
          />
        </button>
      </div>
    </div>
  );
};
