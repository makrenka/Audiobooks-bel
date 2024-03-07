"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { HeaderPlayer } from "../HeaderPlayer/HeaderPlayer";
import { TrackProgress } from "../TrackProgress/TrackProgress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentTime, setVolume } from "@/store/player";
import { PlayerControlButtons } from "../PlayerControlButtons/PlayerControlButtons";

import styles from "./ModalPlayer.module.css";
import { audioBook } from "../MiniPlayer/MiniPlayer";

export const ModalPlayer = ({ closeModal }: { closeModal: () => void }) => {
  const [showVolume, setShowVolume] = useState(false);
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

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioBook.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioBook.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  const formateTime = (time: number) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) - hours * 60;
    const seconds = time % 60;

    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  };

  const editedCurrentTime = formateTime(currentTime);
  const editedDuration = formateTime(duration);

  return createPortal(
    <div className={styles.modalOuter}>
      <div className={styles.container}>
        <HeaderPlayer title={active?.title} closeModal={closeModal} />
        <div className={styles.imgWrapper}>
          <img
            src={active?.cover.url}
            alt="Book cover"
            className={styles.cardImg}
          />
        </div>
        <h2 className={styles.heading}>{active?.title}</h2>
        <p className={styles.author}>{active?.author}</p>
        <div className={styles.playingTime}>
          <TrackProgress
            left={currentTime}
            right={duration}
            leftLabel={editedCurrentTime}
            rightLabel={editedDuration}
            onChange={changeCurrentTime}
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
                  leftLabel={"0"}
                  rightLabel={"100"}
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
