import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface Iuser {
  userId: string;
  username: string;
  email: string;
  loggedIn?: boolean;
}

const instate: Iuser= {
  userId: "",
  username: "",
  email: "",
  loggedIn: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState: instate,
  reducers: {
    loginUser(state, action: PayloadAction<Iuser>) {
      state = {
        userId: action.payload.userId || state.userId,
        username: action.payload.username,
        email: action.payload.email,
        loggedIn: true,
      };
      console.log(state);
    },
    logoutUser(state) {
      state = {
        userId: "",
        username: "",
        email: "",
        loggedIn: false,
      };
      console.log(state);
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const userData = (state: RootState) => state.user
export default userSlice.reducer;
