import { useEffect, useRef } from "react";

import styles from "./BookModalSettings.module.css";

export const BookModalSettings = (node: HTMLDivElement) => {
  const modal = useRef(document.createElement("div"));

  useEffect(() => {
    const { current } = modal;
    document.body.appendChild(current);
    return () => {
      document.body.removeChild(current);
    };
  }, []);

  return (
    <div className={styles.modal} ref={node}>
      <ul>
        <li>Пра кнігу</li>
        <li>Выдаліць з каталёгу</li>
      </ul>
    </div>
  );
};
