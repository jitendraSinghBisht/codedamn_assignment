import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface Iuser {
  username: string;
  email: string;
  loggedIn?: boolean;
}

const instate: Iuser= {
  username: "",
  email: "",
  loggedIn: true,
}

export const userSlice = createSlice({
  name: "user",
  initialState: instate,
  reducers: {
    loginUser(state, action: PayloadAction<Iuser>) {
      state = {
        username: action.payload.username,
        email: action.payload.email,
        loggedIn: true,
      };
    },
    logoutUser(state) {
      state = {
        username: "",
        email: "",
        loggedIn: false,
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const userData = (state: RootState) => state.user
export default userSlice.reducer;
