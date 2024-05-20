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
  const fileFetch = fol.childFiles.filter((f: IFile) => f.id == fileId)

  if (!fileFetch.length) {
    fol.childFolder.map((f: IFolder) => {
      const newPath = path.join(rootPath, f.name)
      return traverseForFile(newPath, f, fileId)
    })
    return null
  } else {
    return path.join(rootPath, fileFetch[0].name)
  }
}

function traverseForFolder(rootPath: string, fol: IFolder, folderId: string): string | null {
  if (!(fol.id === folderId)) {
    fol.childFolder.map((f: IFolder) => {
      const newPath = path.join(rootPath, f.name)
      return traverseForFolder(newPath, f, folderId)
    })
  }

  return rootPath
}

const readFile = asyncHandler((req: Request, res: Response) => {
  const { fileId }= req.params
  const { volumedb }: { volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(basePath, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  const data = fs.readFileSync(filePath);

  res
    .status(200)
    .json(new ApiResponse(200, { fileId, data }, "File read successfully"))
})

const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const { fileId }= req.params
  const { user, volumedb }: { user: UserDocument, volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(basePath, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.unlinkSync(filePath);

  const result: IFolder = {
    id: uuid(),
    name: "root",
    childFiles: [],
    childFolder: []
  }
  folderRead(basePath, result)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(result)
      }
    });

  res
    .status(200)
    .json(new ApiResponse(200, result, "File deleted successfully"))
})

const updateFile = asyncHandler((req: Request, res: Response) => {
  const { fileId }= req.params
  const { volumedb, data }: { volumedb: VolumeDocument, data: string } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const filePath = traverseForFile(basePath, obj, fileId)
  if (!filePath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.writeFileSync(filePath, data);

  res
    .status(200)
    .json(new ApiResponse(200, { fileId, data }, "File updated successfully"))
})

const createFile = asyncHandler(async (req: Request, res: Response) => {
  const { folderId }= req.params
  const { user, volumedb, file }: { user: UserDocument, volumedb: VolumeDocument, file: IFile & { data: string } } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(basePath, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.writeFileSync(path.join(folderPath, file.name), file.data);

  const result: IFolder = {
    id: uuid(),
    name: "root",
    childFiles: [],
    childFolder: []
  }
  folderRead(basePath, result)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(result)
      }
    });

  res
    .status(200)
    .json(new ApiResponse(200, result, "File created successfully"))
})

const createFolder = asyncHandler(async (req: Request, res: Response) => {
  const { folderId }= req.params
  const { user, volumedb, folder }: { user: UserDocument, volumedb: VolumeDocument, folder: string } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(basePath, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.mkdirSync(path.join(folderPath, folder));

  const result: IFolder = {
    id: uuid(),
    name: "root",
    childFiles: [],
    childFolder: []
  }
  folderRead(basePath, result)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(result)
      }
    });

  res
    .status(200)
    .json(new ApiResponse(200, result, "Folder created successfully"))
})

const deleteFolder  = asyncHandler(async (req: Request, res: Response) => {
  const { folderId }= req.params
  const { user, volumedb }: { user: UserDocument, volumedb: VolumeDocument } = req.body
  const obj: IFolder = JSON.parse(volumedb.volumeStructure)

  const basePath = process.env.VOLUME_LOC
  if (!basePath) {
    throw new ApiError(500, "Volume Location is missing in env variables")
  }

  const folderPath = traverseForFolder(basePath, obj, folderId)
  if (!folderPath) {
    throw new ApiError(400, "No such file exists")
  }

  fs.rmSync(folderPath, { recursive: true, force: true });

  const result: IFolder = {
    id: uuid(),
    name: "root",
    childFiles: [],
    childFolder: []
  }
  folderRead(basePath, result)

  await Volume.updateOne(
    {
      owner: user._id,
      volumeName: volumedb.volumeName
    },
    {
      $set: {
        volumeStructure: JSON.stringify(result)
      }
    });

  res
    .status(200)
    .json(new ApiResponse(200, result, "Folder created successfully"))
})

export { readFile, deleteFile, updateFile, createFile, createFolder, deleteFolder }