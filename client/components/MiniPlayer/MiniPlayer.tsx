import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  pauseBook,
  playBook,
  setCurrentTime,
  setDuration,
} from "@/store/player";

import { ModalPlayer } from "../ModalPlayer/ModalPlayer";

import styles from "./MiniPlayer.module.css";

export let audioBook: HTMLAudioElement | null = null;

export const MiniPlayer = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { active, volume, duration, currentTime, pause, showMiniPlayer } =
    useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setShowPlayer(false);
  };

  const setAudio = () => {
    if (active && audioBook) {
      audioBook.src = "http://localhost:5000/" + active.audio;
      audioBook.volume = volume / 100;
      audioBook.onloadedmetadata = () => {
        audioBook && dispatch(setDuration(Math.ceil(audioBook.duration)));
      };
      audioBook.ontimeupdate = () => {
        audioBook && dispatch(setCurrentTime(Math.ceil(audioBook.currentTime)));
      };
    }
  };

  const play = () => {
    dispatch(playBook());
    audioBook && audioBook.play();
  };

  const setPause = () => {
    dispatch(pauseBook());
    audioBook && audioBook.pause();
  };

  useEffect(() => {
    if (!active) audioBook = null;
    if (!audioBook) {
      audioBook = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  useEffect(() => {
    if (showMiniPlayer) setIsActive(true);
  }, [showMiniPlayer]);

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioBook) audioBook.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  if (!active) {
    return null;
  }

  if (isActive)
    return (
      <>
        <div className={styles.player}>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={changeCurrentTime}
            className={styles.indicator}
            style={{
              background: `linear-gradient(90deg, #4838d1 ${
                (currentTime * 100) / duration
              }%, #bbb1fa ${(currentTime * 100) / duration}%)`,
            }}
          />
          <div className={styles.wrapper}>
            <img
              src={"http://localhost:5000/" + active?.cover}
              alt="book's cover"
              className={styles.cover}
              onClick={() => setShowPlayer(true)}
            />
            <div className={styles.info} onClick={() => setShowPlayer(true)}>
              <h3 className={styles.heading}>{active?.title}</h3>
              <p className={styles.author}>{active?.author}</p>
            </div>
            {!pause ? (
              <button onClick={setPause}>
                <img
                  src="/icons/pause-button.png"
                  alt="Pause"
                  className={styles.pauseBtn}
                />
              </button>
            ) : (
              <button className={styles.btnPlay} onClick={play}>
                <img
                  src="/icons/Play.svg"
                  alt="play button"
                  className={styles.btnPlayImg}
                />
              </button>
            )}
          </div>
        </div>
        {showPlayer && <ModalPlayer closeModal={closeModal} />}
      </>
    );
};
