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
    },
    emptyFolder(state) {
      state = {
        id: "",
        name: "",
        childFiles: [],
        childFolder: [],
      }
    },
  },
});

export const { updateFolder } = folderSlice.actions;
export const folderData = (state: RootState) => state.folder;
export default folderSlice.reducer;
