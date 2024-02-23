"use client";
import { useState } from "react";

import { ModalPlayer } from "../ModalPlayer/ModalPlayer";

import styles from "./MiniPlayer.module.css";

export const MiniPlayer = ({
  cover,
  title,
  author,
}: {
  cover: string;
  title: string;
  author: string;
}) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <div className={styles.player} onClick={() => setShowPlayer(true)}>
        <input type="range" className={styles.input} />
        <div className={styles.wrapper}>
          <img src={cover} alt="book's cover" className={styles.cover} />
          <div className={styles.info}>
            <h3 className={styles.heading}>{title}</h3>
            <p className={styles.author}>{author}</p>
          </div>
          <button className={styles.btnPlay}>
            <img
              src="icons/Play.svg"
              alt="play button"
              className={styles.btnPlayImg}
            />
          </button>
        </div>
      </div>
      {showPlayer && <ModalPlayer title={title} />}
    </>
  );
};
