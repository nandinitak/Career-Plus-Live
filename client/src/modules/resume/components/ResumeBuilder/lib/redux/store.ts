import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice.js";
import settingsReducer from "./settingsSlice.js";

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
