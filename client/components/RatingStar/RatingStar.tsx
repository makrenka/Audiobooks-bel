"use client";

import styles from "./RatingStar.module.css";

export const RatingStar = ({ filling }: { filling: number }) => (
  <div className={styles.ratingStar}>
    <div className={styles.filledStar} style={{ width: `${filling}%` }}></div>
  </div>
);
