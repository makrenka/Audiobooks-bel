import { useAppDispatch } from "@/store/hooks";
import { pauseBook, playBook } from "@/store/player";
import { audioBook } from "../MiniPlayer/MiniPlayer";

import styles from "../ModalPlayer/ModalPlayer.module.css";

export const PlayerControlButtons = ({ pause }: { pause: boolean }) => {
  const dispatch = useAppDispatch();

  const play = () => {
    if (pause) {
      dispatch(playBook());
      audioBook.play();
    } else {
      dispatch(pauseBook());
      audioBook.pause();
    }
  };

  return (
    <>
      <button>
        <img src="/icons/Arrow-Left-Circle.svg" alt="Arrow-Left" />
      </button>
      <div>
        {!pause ? (
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
    </>
  );
};
