"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { HeaderPlayer } from "../HeaderPlayer/HeaderPlayer";
import { TrackProgress } from "../TrackProgress/TrackProgress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pauseBook, playBook } from "@/store/player";

import styles from "./ModalPlayer.module.css";

let audioBook: HTMLAudioElement;

export const ModalPlayer = ({
  cover,
  title,
  author,
  audio,
  closeModal,
}: {
  cover: string;
  title: string;
  author: string;
  audio: string;
  closeModal: () => void;
}) => {
  const modal = useRef(document.createElement("div"));
  const { active, volume, duration, currentTime, pause } = useAppSelector(
    (state) => state.player
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { current } = modal;

    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  useEffect(() => {
    if (!audioBook) {
      audioBook = new Audio();
      audioBook.src = audio;
    }
  }, []);

  const play = () => {
    if (pause) {
      dispatch(playBook());
      audioBook.play();
    } else {
      dispatch(pauseBook());
      audioBook.pause();
    }
  };

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
              {pause ? (
                <button onClick={play}>
                  <img
                    src="/icons/pause-button.png"
                    alt="Pause"
                    className={styles.pauseBtn}
                  />
                </button>
              ) : (
                <button onClick={play}>
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
