"use client";
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

export let audioBook: HTMLAudioElement;

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
    if (active) {
      audioBook.src = active.audio;
      audioBook.volume = volume / 100;
      audioBook.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audioBook.duration)));
      };
      audioBook.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audioBook.currentTime)));
      };
    }
  };

  useEffect(() => {
    if (!audioBook) {
      audioBook = new Audio();
    } else {
      setAudio();
    }
  }, [active]);

  useEffect(() => {
    if (showMiniPlayer) setIsActive(true);
  }, [showMiniPlayer]);

  const play = () => {
    if (pause) {
      dispatch(playBook());
      audioBook.play();
    } else {
      dispatch(pauseBook());
      audioBook.pause();
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioBook.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

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
              src={active?.cover.url}
              alt="book's cover"
              className={styles.cover}
              onClick={() => setShowPlayer(true)}
            />
            <div className={styles.info} onClick={() => setShowPlayer(true)}>
              <h3 className={styles.heading}>{active?.title}</h3>
              <p className={styles.author}>{active?.author}</p>
            </div>
            {!pause ? (
              <button onClick={play}>
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
