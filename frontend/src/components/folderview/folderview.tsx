import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FolderPlus, FilePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IFolder, IFile, IApiResponse, IApiError } from "@/types";
import { folderData, updateFolder } from "../store/slice/folder.slice";
import { fileData, updateFile } from "../store/slice/files.slice";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { containerData } from "../store/slice/container.slice";

function FolderView({ folder }: { folder: IFolder }) {
  const [expand, setExpand] = useState(true);
  const file = useSelector(fileData);
  const fol = useSelector(folderData);
  const container = useSelector(containerData);
  const dispatch = useDispatch();

  useEffect(() => {}, [fol, file]);

  async function readFile(fileId: string) {
    try {
      const response = await axios.post(`/file/read-file/${fileId}`, {
        volumeName: container.containerName,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to read file... \nTry again later....");
        return;
      }
      dispatch(
        updateFile({
          curFile: jres.data.file,
          curFileId: jres.data.fileId,
          curFileData: jres.data.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function changeFile(fileId: string) {
    if (file.curFileId === "") readFile(fileId);
    try {
      const response = await axios.patch(
        `/file/update-file/${file.curFileId}`,
        {
          data: file.curFileData,
          volumeName: container.containerName,
        }
      );
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to save file... \nTry again later....");
        return;
      }
      readFile(fileId);
    } catch (error) {
      console.log(error);
    }
  }

  async function createFile(folderId: string) {
    const fileName = prompt("Enter file name: ");
    if (fileName === null || !fileName.trim()) {
      alert("Try again with valid input....");
      return;
    }

    try {
      const response = await axios.post(`/file/create-file/${folderId}`, {
        file: fileName,
        volumeName: container.containerName,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to create file... \nTry again later....");
        return;
      }
      dispatch(updateFolder(jres.data));
      alert("File created...");
    } catch (error) {
      alert("Unable to create file... \nTry again later....");
      console.log(error);
    }
  }

  async function createFolder(folderId: string) {
    const folderName = prompt("Enter folder name: ");
    if (folderName === null || !folderName.trim()) {
      alert("Try again with valid input....");
      return;
    }
    try {
      const response = await axios.post(`/file/create-folder/${folderId}`, {
        folder: folderName,
        volumeName: container.containerName,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to create folder... \nTry again later....");
        return;
      }
      dispatch(updateFolder(jres.data));
      alert("Folder created...");
    } catch (error) {
      alert("Unable to create folder... \nTry again later....");
      console.log(error);
    }
  }

  async function deleteFolder(folderId: string) {
    try {
      const response = await axios.patch(`/file/delete-folder/${folderId}`, {
        volumeName: container.containerName,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to delete folder... \nTry again later....");
        return;
      }
      dispatch(updateFolder(jres.data));
      alert("Folder deleted...");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFile(fileId: string) {
    try {
      const response = await axios.patch(`/file/delete-file/${fileId}`, {
        volumeName: container.containerName,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to delete file... \nTry again later....");
        return;
      }
      dispatch(updateFolder(jres.data));
      alert("File deleted...");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <button
            className="ml-3 cursor-pointer max-w-fit flex items-center"
            onClick={() => setExpand(!expand)}
            key={folder.id}
          >
            {expand ? `📂 ${folder.name}` : `📁 ${folder.name}`}
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-slate-100 p-0 m-0 gap-0 max-w-fit min-w-fit">
          <Button
            className="p-1 m-0 max-w-fit"
            variant="ghost"
            onClick={() => createFile(folder.id)}
          >
            <FilePlus />
          </Button>
          <Button
            className="p-1 m-0 max-w-fit"
            variant="ghost"
            onClick={() => createFolder(folder.id)}
          >
            <FolderPlus />
          </Button>
          <Button
            className="p-1 m-0 max-w-fit"
            variant="ghost"
            onClick={() => deleteFolder(folder.id)}
          >
            <Trash2 />
          </Button>
        </ContextMenuContent>
      </ContextMenu>

      <div style={{ display: expand ? "block" : "none", paddingLeft: "10px" }}>
        {folder.childFolder.map((child: IFolder) => (
          <FolderView folder={child} key={child.id} />
        ))}
        {folder.childFiles.map((child: IFile) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <button
                className="ml-3 cursor-pointer max-w-fit flex items-center"
                onClick={() => {
                  changeFile(child.id);
                }}
                key={child.id}
              >
                {`📄 ${child.name}`}
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-slate-100 p-0 m-0 gap-0 max-w-fit min-w-fit">
              <Button
                className="p-1 m-0 max-w-fit"
                variant="ghost"
                onClick={() => deleteFile(child.id)}
              >
                <Trash2 />
              </Button>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </>
  );
}

export default FolderView;
