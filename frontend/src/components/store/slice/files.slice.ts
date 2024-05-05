import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { TFiles } from "../../folderview/folderview";
 
interface Ifile {
  folder?: Array<TFiles>;
  curFile?: string;
  curFolder?: string;
  curFileLink?: string;
}

const instate: Ifile = {
    folder: [],
    curFile: "",
    curFolder: "",
    curFileLink: "",
  }

export const fileSlice = createSlice({
  name: "file",
  initialState: instate,
  reducers: {
    updateFolder(state, action: PayloadAction<Ifile>) {
      state = {
        folder: action.payload.folder || state.folder,
        curFile: action.payload.curFile || state.curFile,
        curFolder: action.payload.curFolder || state.curFolder,
        curFileLink: action.payload.curFileLink || state.curFileLink,
      };
    },
  },
});

export const { updateFolder } = fileSlice.actions;
export const fileData = (state: RootState) => state.file;
export default fileSlice.reducer;
