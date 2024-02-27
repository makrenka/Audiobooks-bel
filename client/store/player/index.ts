import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./types";
import { Book } from "../books/types";

const initialState: PlayerState = {
  active: null,
  volume: 0,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pause: (state) => {
      state.pause = true;
    },
    play: (state) => {
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
    },
  },
});

export const {
  pause,
  play,
  setCurrentTime,
  setVolume,
  setDuration,
  setActive,
} = playerSlice.actions;
