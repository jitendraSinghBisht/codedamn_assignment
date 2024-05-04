import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import fileReducer from "./slice/files.slice";

export const store = configureStore({
  reducer:{
    user: userReducer,
    file: fileReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>