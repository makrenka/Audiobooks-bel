import styles from "./HeaderPlayer.module.css";

export const HeaderPlayer = ({ title }: { title: string }) => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <button className={styles.arrowBtn}>
        <img src="/icons/arrow-header-player.svg" alt="arrow hide player" />
      </button>
      <h2 className={styles.heading}>{title}</h2>
      <img
        src="/icons/more-header-detail.svg"
        alt="more icon"
        className={styles.moreIcon}
      />
    </div>
  </header>
);
