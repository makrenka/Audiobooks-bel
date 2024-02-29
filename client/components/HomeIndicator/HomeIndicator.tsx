import styles from "./HomeIndicator.module.css";

export const HomeIndicator = () => (
  <div className={styles.indicator}>
    <img
      src="/home-indicator.svg"
      alt="indicator icon"
      className={styles.img}
    />
  </div>
);
