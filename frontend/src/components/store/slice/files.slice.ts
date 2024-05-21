import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IFile, IFolder } from "@/types";

interface Ifile {
  curFile?: IFile | null;
  curFolder?: IFolder | null;
  curFileData?: string;
}

const instate: Ifile = {
    curFile: null,
    curFolder: null,
    curFileData: "",
  }

export const fileSlice = createSlice({
  name: "file",
  initialState: instate,
  reducers: {
    updateFile(state, action: PayloadAction<Ifile>) {
      state = {
        curFile: action.payload.curFile || state.curFile,
        curFolder: action.payload.curFolder || state.curFolder,
        curFileData: action.payload.curFileData || state.curFileData,
      };
    },
  },
});

export const { updateFile } = fileSlice.actions;
export const fileData = (state: RootState) => state.file;
export default fileSlice.reducer;
export type { Ifile }