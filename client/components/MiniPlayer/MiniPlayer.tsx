"use client";
import { useEffect, useState } from "react";

import { ModalPlayer } from "../ModalPlayer/ModalPlayer";

import styles from "./MiniPlayer.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  pauseBook,
  playBook,
  setActive,
  setCurrentTime,
  setDuration,
} from "@/store/player";
import { TrackProgress } from "../TrackProgress/TrackProgress";

export let audioBook: HTMLAudioElement;

export const MiniPlayer = ({
  cover,
  title,
  author,
  audio,
}: {
  cover: string;
  title: string;
  author: string;
  audio: string;
}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { active, volume, duration, currentTime, pause, showMiniPlayer } =
    useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setShowPlayer(false);
  };

  useEffect(() => {
    if (!audioBook) {
      audioBook = new Audio();
      audioBook.src = audio;
      audioBook.volume = volume / 100;
      audioBook.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audioBook.duration)));
      };
      audioBook.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audioBook.currentTime)));
      };
    }
  }, []);

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
          <TrackProgress
            left={currentTime}
            right={duration}
            onChange={changeCurrentTime}
          />
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
        {showPlayer && (
          <ModalPlayer
            cover={cover}
            author={author}
            title={title}
            audio={audio}
            closeModal={closeModal}
          />
        )}
      </>
    );
};
