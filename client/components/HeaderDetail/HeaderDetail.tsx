import Link from "next/link";

import useClickOutside from "@/hooks/useClickOutside";
import { BookModalSettings } from "../BookModalSettings/BookModalSettings";

import styles from "./HeaderDetail.module.css";

export const HeaderDetail = ({ title }: { title: string | undefined }) => {
  const { ref, isShow, setIsShow } = useClickOutside(false);

  const closeSettingsModal = () => {
    setIsShow(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper} ref={ref}>
          <Link href="/" className={styles.link}>
            <img src="/icons/arrow-header-section.svg" alt="arrow to home" />
          </Link>
          <h2 className={styles.heading} onClick={closeSettingsModal}>
            {title}
          </h2>
          <button className={styles.btn} onClick={() => setIsShow(!isShow)}>
            <img
              src="/icons/more-header-detail.svg"
              alt="more icon"
              className={styles.moreIcon}
            />
          </button>
          {isShow && <BookModalSettings />}
        </div>
      </header>
    </>
  );
};
