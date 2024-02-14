import Link from "next/link";

import styles from "./HeaderSection.module.css";

export const HeaderSection = ({ heading }: { heading: string }) => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <Link href="/" className={styles.link}>
        <img
          src="/icons/arrow-header-section.svg"
          alt="arrow home"
          className={styles.arrow}
        />
      </Link>
      <h2 className={styles.heading}>{heading}</h2>
    </div>
  </header>
);
