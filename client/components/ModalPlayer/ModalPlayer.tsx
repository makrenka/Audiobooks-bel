"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { HeaderPlayer } from "../HeaderPlayer/HeaderPlayer";
import { TrackProgress } from "../TrackProgress/TrackProgress";
import { useAppSelector } from "@/store/hooks";
import { setVolume } from "@/store/player";
import { PlayerControlButtons } from "../PlayerControlButtons/PlayerControlButtons";

import styles from "./ModalPlayer.module.css";

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
  const [showVolume, setShowVolume] = useState(false);
  const modal = useRef(document.createElement("div"));
  const { active, volume, duration, currentTime, pause } = useAppSelector(
    (state) => state.player
  );

  useEffect(() => {
    const { current } = modal;

    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
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
        <div className={styles.playingTime}>
          <TrackProgress
            left={currentTime}
            right={duration}
            onChange={() => {}}
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttonsHigh}>
            <button onClick={() => setShowVolume(!showVolume)}>
              <img src="/icons/Volume.svg" alt="Volume" />
            </button>
            {!showVolume ? (
              <PlayerControlButtons pause={pause} />
            ) : (
              <div className={styles.volume}>
                <h6 className={styles.volumeHeading}>Узровень гуку:</h6>
                <TrackProgress
                  left={volume}
                  right={100}
                  onChange={changeVolume}
                />
              </div>
            )}
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
