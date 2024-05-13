import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IContainer {
  wsurl: string;
  containerId: string;
  containerName: string;
}

const instate: IContainer = {
    wsurl: "",
    containerId: "",
    containerName: "",
  }

export const containerSlice = createSlice({
  name: "container",
  initialState: instate,
  reducers: {
    setContainer(state, action: PayloadAction<IContainer>) {
      state = {
        wsurl: action.payload.wsurl,
        containerId: action.payload.containerId,
        containerName: action.payload.containerName,
      };
    },
  },
});

export const { setContainer } = containerSlice.actions;
export const containerData = (state: RootState) => state.container;
export default containerSlice.reducer;
