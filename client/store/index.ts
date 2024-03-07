import { createWrapper } from "next-redux-wrapper";
import { Action, Store, applyMiddleware } from "redux";
import { playerSlice } from "./player";
import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import { bookSclice } from "./books";
import { thunk } from "redux-thunk";

// create a makeStore function
export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerSlice.reducer,
      book: bookSclice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  });
};

export const store = makeStore();

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
