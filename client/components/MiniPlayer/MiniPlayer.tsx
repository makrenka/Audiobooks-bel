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
  const [isActive, setIsActive] = useState(false);

  const closeModal = () => {
    setShowPlayer(false);
  };

  return (
    <>
      <div className={styles.player}>
        <input type="range" className={styles.input} />
        <div className={styles.wrapper}>
          <img
            src={cover}
            alt="book's cover"
            className={styles.cover}
            onClick={() => setShowPlayer(true)}
          />
          <div className={styles.info} onClick={() => setShowPlayer(true)}>
            <h3 className={styles.heading}>{title}</h3>
            <p className={styles.author}>{author}</p>
          </div>
          {isActive ? (
            <button onClick={() => setIsActive(false)}>
              <img
                src="/icons/pause-button.png"
                alt="Pause"
                className={styles.pauseBtn}
              />
            </button>
          ) : (
            <button
              className={styles.btnPlay}
              onClick={() => setIsActive(true)}
            >
              <img
                src="/icons/Play.svg"
                alt="play button"
                className={styles.btnPlayImg}
              />
            </button>
          )}
        </div>
      </div>
      {showPlayer && (
        <ModalPlayer
          cover={cover}
          author={author}
          title={title}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
