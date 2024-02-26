"use client";

import { useEffect, useRef, useState } from "react";
import { HeaderPlayer } from "../HeaderPlayer/HeaderPlayer";

import styles from "./ModalPlayer.module.css";
import { createPortal } from "react-dom";
import { TrackProgress } from "../TrackProgress/TrackProgress";

export const ModalPlayer = ({
  cover,
  title,
  author,
  closeModal,
}: {
  cover: string;
  title: string;
  author: string;
  closeModal: () => void;
}) => {
  const modal = useRef(document.createElement("div"));

  useEffect(() => {
    const { current } = modal;

    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  return createPortal(
    <div className={styles.modalOuter}>
      <div className={styles.container}>
        <HeaderPlayer title={title} closeModal={closeModal} />
        <div className={styles.imgWrapper}>
          <img src={cover} alt="Book cover" className={styles.cardImg} />
        </div>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.author}>{author}</p>
        <TrackProgress left={0} right={100} onChange={() => {}} />
        <div className={styles.buttons}>
          <img src="icons/Volume.svg" alt="Volume" />
          <img src="icons/Arrow-Left-Circle.svg" alt="Arrow-Left" />
          <img src="icons/Play.svg" alt="Play" />
          <img src="icons/Arrow-Right-Circle.svg" alt="Arrow-Right" />
          <img src="icons/Upload.svg" alt="Upload" />
        </div>
      </div>
    </div>,
    modal.current
  );
};
