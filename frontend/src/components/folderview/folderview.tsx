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
import env from "@/conf";

function Folder({ folder }: { folder: IFolder }) {
  const [expand, setExpand] = useState(true);
  const file = useSelector(fileData);
  const fol = useSelector(folderData);
  const dispatch = useDispatch();

  useEffect(() => {}, [fol, file]);

  async function readFile(fileId: string) {
    const response = await fetch(`${env.url}/api/file/read-file/${fileId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to read file... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(
        updateFile({
          curFile: jres.data.file,
          curFileId: jres.data.fileId,
          curFileData: jres.data.data,
        })
      );
    }
  }

  async function changeFile(fileId: string) {
    const response = await fetch(
      `${env.url}/api/file/update-file/${file.curFileId}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: file.curFileData,
        }),
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to save file... \nTry again later....");
      return;
    }
    readFile(fileId);
  }

  async function createFile(folderId: string) {
    const fileName = prompt("Enter file name: ");
    if (fileName === null) {
      return;
    } else if (!fileName.trim()) {
      alert("Try again with valid input....");
      return;
    }
    const response = await fetch(
      `${env.url}/api/file/create-file/${folderId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: fileName,
        }),
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to create file... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(updateFolder(jres.data.result));
      alert("File created...");
      return;
    }
  }

  async function createFolder(folderId: string) {
    const folderName = prompt("Enter folder name: ");
    if (folderName === null) {
      return;
    } else if (!folderName.trim()) {
      alert("Try again with valid input....");
      return;
    }
    const response = await fetch(
      `${env.url}/api/file/create-folder/${folderId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folder: folderName,
        }),
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to create folder... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(updateFolder(jres.data.result));
      alert("Folder created...");
      return;
    }
  }

  async function deleteFolder(folderId: string) {
    const response = await fetch(
      `${env.url}/api/file/delete-folder/${folderId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to delete folder... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(updateFolder(jres.data.result));
      alert("Folder deleted...");
      return;
    }
  }

  async function deleteFile(fileId: string) {
    const response = await fetch(`${env.url}/api/file/delete-file/${fileId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to delete file... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(updateFolder(jres.data.result));
      alert("File deleted...");
      return;
    }
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="ml-3 cursor-pointer max-w-fit"
            onClick={() => setExpand(!expand)}
          >
            {expand ? `📂${folder.name}` : `📁${folder.name}`}
          </div>
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
        {folder.childFolder.map((child: IFolder) => {
          return <Folder folder={child} key={child.id} />;
        })}
        {folder.childFiles.map((child: IFile) => {
          return (
            <ContextMenu>
              <ContextMenuTrigger>
                <div
                  className="ml-3 cursor-pointer max-w-fit"
                  onClick={() => changeFile(child.id)}
                  key={child.id}
                >
                  {`📄${child.name}`}
                </div>
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
          );
        })}
      </div>
    </>
  );
}

function Folderview() {
  const rootfolder = useSelector(folderData);
  const file = useSelector(fileData);
  const dispatch = useDispatch();

  async function saveFile() {
    const response = await fetch(`${env.url}/api/file/${file.curFileId}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: file.curFileData,
      }),
    });
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to save file... \nTry again later....");
      return;
    }
    if ("data" in jres) {
      dispatch(
        updateFile({
          curFile: jres.data.file,
          curFileId: jres.data.fileId,
          curFileData: jres.data.data,
        })
      );
      alert("File saved....");
    }
  }

  if (!rootfolder.id) {
    return <></>;
  }

  return (
    <div>
      <div className="mb-3">
        <Button
          variant="link"
          className="bg-gray-500 w-full rounded-none text-white"
          onClick={() => saveFile()}
        >
          Save File
        </Button>
      </div>
      <Folder folder={rootfolder} key={rootfolder.id} />
    </div>
  );
}

export default Folderview;
