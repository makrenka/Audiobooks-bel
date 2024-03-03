import { Book } from "../books/types";

export interface PlayerState {
  active: null | Book;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  showMiniPlayer: boolean;
}
