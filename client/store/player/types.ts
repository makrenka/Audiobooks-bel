import { Book } from "../books/types";

export type PlayerState = {
  active: null | Book;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  showMiniPlayer: boolean;
};
