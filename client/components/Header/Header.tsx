import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link href={"/"} className={styles.logoLink}>
          <img src="/icons/logo.svg" alt="logo" />
        </Link>
        <Link href={"/"} className={styles.link}>
          <h1 className={styles.heading}>Аўдыёкнігі</h1>
        </Link>
      </div>
      <Link href={"/settings"}>
        <img src="/icons/settings.svg" alt="settings" />
      </Link>
    </div>
  </header>
);
