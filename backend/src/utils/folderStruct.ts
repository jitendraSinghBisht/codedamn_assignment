import fs from 'node:fs';
import path from "node:path";
import { v4 as uuid } from "uuid";

interface IFile {
  id: string;
  name: string;
}
interface IFolder {
  id: string;
  name: string;
  childFiles: Array<IFile>;
  childFolder: Array<IFolder>;
}

function folderRead(dirPath: string, obj: IFolder) {
  const elements = fs.readdirSync(dirPath);

  elements.map((el) => {
    const elPath = path.join(dirPath, el)
    if (fs.lstatSync(elPath).isDirectory()) {
      const elObj: IFolder = {
        id: uuid(),
        name: el,
        childFiles: [],
        childFolder: []
      }
      folderRead(elPath, elObj)
      obj.childFolder.push(elObj)
    } else {
      const elObj: IFile = {
        id: uuid(),
        name: el
      }
      obj.childFiles.push(elObj)
    }
  })
}

export default folderRead
export type { IFile, IFolder }