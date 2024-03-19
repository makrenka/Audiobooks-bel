import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Header.module.css";

export const Header = () => {
  const router = useRouter();

  const routSettings = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/settings");
    } else {
      router.push("/auth/login");
    }
  };

  return (
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
        <button
          type="button"
          onClick={routSettings}
          className={styles.settingsBtn}
        >
          <img src="/icons/settings.svg" alt="settings" />
        </button>
      </div>
    </header>
  );
};
