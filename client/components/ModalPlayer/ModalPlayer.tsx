"use client";

import { useEffect, useRef } from "react";
import { HeaderPlayer } from "../HeaderPlayer/HeaderPlayer";

import styles from "./ModalPlayer.module.css";
import { createPortal } from "react-dom";

export const ModalPlayer = ({ title }: { title: string }) => {
  const modal = useRef(document.createElement("div"));

  useEffect(() => {
    const { current } = modal;

    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  return createPortal(
    <div className={styles.container}>
      <HeaderPlayer title={title} />
    </div>,
    modal.current
  );
};
