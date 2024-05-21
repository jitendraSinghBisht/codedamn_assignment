import { useState } from "react";
import { useSelector } from "react-redux";
import { IFolder, IFile } from "@/types";
import { folderData } from "../store/slice/folder.slice";
import { fileData } from "../store/slice/files.slice";

function Folder({ folder }: { folder: IFolder }) {
  const [expand, setExpand] = useState(true);
  const file = useSelector(fileData)

  function changeFile(){
    file.curFile
  }

  return (
    <>
      <div className="folder cursor-pointer" onClick={() => setExpand(!expand)}>
        📁 {folder.name}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}>
        {folder.childFolder.map((child: IFolder) => {
          return <Folder folder={child} />;
        })}
        {folder.childFiles.map((child: IFile) => {
          return <div className="file cursor-pointer" onClick={changeFile}> 🗄️{child.name}</div>;
        })}
      </div>
    </>
  );
}

function Folderview() {
  const rootfolder = useSelector(folderData)

  return <Folder folder={rootfolder} />;
}

export default Folderview;