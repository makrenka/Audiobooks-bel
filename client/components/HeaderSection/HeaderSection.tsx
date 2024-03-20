import Link from "next/link";

import styles from "./HeaderSection.module.css";
import { useRouter } from "next/router";

export const HeaderSection = ({ heading }: { heading: string }) => {
  const router = useRouter();

  const reference = router.pathname === "/profile" ? "/settings" : "/";

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href={reference} className={styles.link}>
          <img
            src="/icons/arrow-header-section.svg"
            alt="arrow home"
            className={styles.arrow}
          />
        </Link>
        <h2 className={styles.heading}>{heading}</h2>
        {router.pathname === "/profile" && (
          <button type="button" className={styles.saveBtn}>
            Захаваць
          </button>
        )}
      </div>
    </header>
  );
};
