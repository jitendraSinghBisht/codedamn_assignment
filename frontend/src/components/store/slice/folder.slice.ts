import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IFolder } from "@/types";

const instate: IFolder = {
  id: "",
  name: "",
  childFiles: [],
  childFolder: [],
}

export const folderSlice = createSlice({
  name: "file",
  initialState: instate,
  reducers: {
    updateFolder(state, action: PayloadAction<IFolder>) {
      state = action.payload;
      console.log(state);
    },
    emptyFolder(state) {
      state = {
        id: "",
        name: "",
        childFiles: [],
        childFolder: [],
      }
      console.log(state);
    },
  },
});

export const { updateFolder } = folderSlice.actions;
export const folderData = (state: RootState) => state.folder;
export default folderSlice.reducer;
