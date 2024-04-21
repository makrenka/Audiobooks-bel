import Link from "next/link";

import styles from "./HeaderSection.module.css";
import { useRouter } from "next/router";

export const HeaderSection = ({
  heading,
  onSubmit,
}: {
  heading: string;
  onSubmit?: Function;
}) => {
  const router = useRouter();

  const reference =
    router.pathname === "/profile" || router.pathname === "/admin"
      ? "/settings"
      : router.pathname === "/add-book"
      ? "/admin"
      : "/";

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
        {router.pathname === "/profile" && onSubmit && (
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => onSubmit()}
          >
            Захаваць
          </button>
        )}
      </div>
    </header>
  );
};
