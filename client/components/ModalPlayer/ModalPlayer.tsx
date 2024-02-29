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
  const [isActive, setIsActive] = useState(false);

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
          <div className={styles.buttonsHigh}>
            <button>
              <img src="/icons/Volume.svg" alt="Volume" />
            </button>
            <button>
              <img src="/icons/Arrow-Left-Circle.svg" alt="Arrow-Left" />
            </button>
            <div>
              {isActive ? (
                <button onClick={() => setIsActive(false)}>
                  <img
                    src="/icons/pause-button.png"
                    alt="Pause"
                    className={styles.pauseBtn}
                  />
                </button>
              ) : (
                <button onClick={() => setIsActive(true)}>
                  <img src="/icons/Play-big.svg" alt="Play" />
                </button>
              )}
            </div>
            <button>
              <img src="/icons/Arrow-Right-Circle.svg" alt="Arrow-Right" />
            </button>
            <button>
              <img src="/icons/Upload.svg" alt="Upload" />
            </button>
          </div>
          <div className={styles.buttonsLow}>
            <div className={styles.options}>
              <button>
                <img src="/icons/Bookmark.svg" alt="Bookmark" />
              </button>
              <p className={styles.optionsText}>Закладка</p>
            </div>
            <div className={styles.options}>
              <button>
                <img src="/icons/Paper.svg" alt="Chapter 2" />
              </button>
              <p className={styles.optionsText}>Глава 2</p>
            </div>
            <div className={styles.options}>
              <button>
                <img src="/icons/Time-Square.svg" alt="Time" />
              </button>
              <p className={styles.optionsText}>Хуткасьць 10x</p>
            </div>
            <div className={styles.options}>
              <button>
                <img src="/icons/Arrow-Down-Square.svg" alt="Download" />
              </button>
              <p className={styles.optionsText}>Спампаваць</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modal.current
  );
};
