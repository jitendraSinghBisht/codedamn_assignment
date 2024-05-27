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

function folderRead(dirPath: string, obj?: IFolder) {
  const elements = fs.readdirSync(dirPath);

  if (!obj) {
    obj = {
      id: uuid(),
      name: path.basename(dirPath),
      childFiles: [],
      childFolder: []
    };
  }

  obj.childFolder = obj.childFolder.filter(folder => elements.includes(folder.name));
  obj.childFiles = obj.childFiles.filter(file => elements.includes(file.name));

  elements.forEach((el) => {
    const elPath = path.join(dirPath, el);
    if (fs.lstatSync(elPath).isDirectory()) {
      const existingFolder = obj.childFolder.find(folder => folder.name === el);
      const elObj: IFolder = existingFolder || {
        id: uuid(),
        name: el,
        childFiles: [],
        childFolder: []
      };
      folderRead(elPath, elObj);
      if (!existingFolder) {
        obj.childFolder.push(elObj);
      }
    } else {
      const existingFile = obj?.childFiles.find(file => file.name === el);
      const elObj: IFile = existingFile || {
        id: uuid(),
        name: el
      };
      if (!existingFile) {
        obj.childFiles.push(elObj);
      }
    }
  });

  return obj;
}


export default folderRead
export type { IFile, IFolder }