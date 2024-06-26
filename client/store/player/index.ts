import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./types";
import { Book } from "../books/types";

const initialState: PlayerState = {
  active: null,
  volume: 100,
  duration: 0,
  currentTime: 0,
  pause: true,
  showMiniPlayer: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pauseBook: (state) => {
      state.pause = true;
    },
    playBook: (state) => {
      state.pause = false;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setActive: (state, action: PayloadAction<null | Book>) => {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
      state.showMiniPlayer = true;
    },
    setPlayerUnActive: (state) => {
      state.active = null;
      state.pause = true;
      state.duration = 0;
      state.currentTime = 0;
      state.showMiniPlayer = false;
    },
  },
});

export const {
  pauseBook,
  playBook,
  setCurrentTime,
  setVolume,
  setDuration,
  setActive,
  setPlayerUnActive,
} = playerSlice.actions;
