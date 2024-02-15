import Link from "next/link";

import styles from "./HeaderDetail.module.css";

export const HeaderDetail = ({ title }: { title: string | undefined }) => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <Link href="/">
        <img
          src="/icons/arrow-header-section.svg"
          alt="arrow to home"
          className={styles.arrowIcon}
        />
      </Link>
      <h2 className={styles.heading}>{title}</h2>
      <img
        src="/icons/more-header-detail.svg"
        alt="more icon"
        className={styles.moreIcon}
      />
    </div>
  </header>
);
