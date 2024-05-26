import fs from 'node:fs';
import path from 'node:path';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { VolumeDocument, Volume } from '../models/volume.model.js';
import { v4 as uuid } from 'uuid';
import { UserDocument } from '../models/user.model.js';
import folderRead, { IFolder, IFile } from '../utils/folderStruct.js';

function traverseForFile(rootPath: string, fol: IFolder, fileId: string): string | null {
  const fileFetch = fol.childFiles.filter(({id}) => {console.log(id,fileId);return id == fileId})

console.log(fileFetch)

  if (!fileFetch.length) {
    for (const childFolder of fol.childFolder) {
      const newPath = path.join(rootPath, childFolder.name);
      const foundPath = traverseForFile(newPath, childFolder, fileId);
      if (foundPath) return foundPath;
    }
    return null;
  } else {
    return path.join(rootPath, fileFetch[0].name);
  }
}

function traverseForFolder(rootPath: string, fol: IFolder, folderId: string): string | undefined {
  if (fol.id == folderId) return rootPath;
  for (const childFolder of fol.childFolder) { 
    const newPath = path.join(rootPath, childFolder.name); 
    const foundPath = traverseForFolder(newPath, childFolder, folderId); 
    if (foundPath) return foundPath;
  }
  return undefined;
}

const readFile = asyncHandler((req: Request, res: Response) => {
  const { fileId } = req.params
  const { volumedb }: { volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(`${basePath}/${volumedb.volumeName}`, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  const data = fs.readFileSync(filePath, 'utf8');

  return res
    .status(200)
    .json(new ApiResponse(200, {
      file: filePath.split("/").pop(),
      fileId,
      data
    }, "File read successfully"))
})

const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const { fileId } = req.params
  const { user, volumedb }: { user: UserDocument, volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(`${basePath}/${volumedb.volumeName}`, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.unlinkSync(filePath);

  folderRead(`${basePath}/${volumedb.volumeName}`, obj)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(obj)
      }
    });

  return res
    .status(200)
    .json(new ApiResponse(200, obj, "File deleted successfully"))
})

const updateFile = asyncHandler((req: Request, res: Response) => {
  const { fileId } = req.params
  const { volumedb, data }: { volumedb: VolumeDocument, data: string } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(`${basePath}/${volumedb.volumeName}`, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.writeFileSync(filePath, data);

  return res
    .status(200)
    .json(new ApiResponse(200, {
      file: filePath.split("/").pop(),
      fileId,
      data
    }, "File updated successfully"))
})

const createFile = asyncHandler(async (req: Request, res: Response) => {
  const { folderId } = req.params
  const { user, volumedb, file }: { user: UserDocument, volumedb: VolumeDocument, file: string } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(`${basePath}/${volumedb.volumeName}`, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such folder exists")
  }

  fs.writeFileSync(path.join(folderPath, file), "");


  folderRead(`${basePath}/${volumedb.volumeName}`, obj)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(obj)
      }
    });

  return res
    .status(200)
    .json(new ApiResponse(200, obj, "File created successfully"))
})

const createFolder = asyncHandler(async (req: Request, res: Response) => {
  const { folderId } = req.params
  const { user, volumedb, folder }: { user: UserDocument, volumedb: VolumeDocument, folder: string } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(`${basePath}/${volumedb.volumeName}`, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.mkdirSync(path.join(folderPath, folder));


  folderRead(`${basePath}/${volumedb.volumeName}`, obj)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(obj)
      }
    });

  return res
    .status(200)
    .json(new ApiResponse(200, obj, "Folder created successfully"))
})

const deleteFolder = asyncHandler(async (req: Request, res: Response) => {
  const { folderId } = req.params
  const { user, volumedb }: { user: UserDocument, volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(`${basePath}/${volumedb.volumeName}`, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.rmSync(folderPath, { recursive: true, force: true });


  folderRead(`${basePath}/${volumedb.volumeName}`, obj)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(obj)
      }
    });

  return res
    .status(200)
    .json(new ApiResponse(200, obj, "Folder deleted successfully"))
})

export { readFile, deleteFile, updateFile, createFile, createFolder, deleteFolder }