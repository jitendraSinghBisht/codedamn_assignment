import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Volume } from "../models/volume.model.js";
import Docker from "dockerode";
import { Document } from "mongoose";
import fs from 'node:fs';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
enum workDir {
  node,
  java,
  python,
  ccpp
}


const createContainer = asyncHandler(async (req: Request, res: Response) => {
  const { imageName, lang, user }: { imageName: string, lang: workDir, user: Document } = req.body;
  const name = `${user._id}+${Date.now()}`;

  if (!imageName || !lang || !user) {
    throw new ApiError(400, "imageName, lang and user are required")
  }

  const volumeName = `${process.env.VOLUME_LOC}/volumes/${name}`

  if (!fs.existsSync(volumeName)) {
    fs.mkdirSync(volumeName, { recursive: true });
  }

  const options = {
    Image: imageName,
    name: name,
    Volumes: { [`/home/${lang}`]: {} },
    Cmd: ['sh'],
    WorkingDir: `/home/${lang}`,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: true,
    HostConfig:{
      Binds: [`${volumeName}:/home/${lang}`],
    }
  }
  const container = await docker.createContainer(options);

  await container.start();

  return res
    .status(200)
    .json(new ApiResponse(200, {
      wsurl: process.env.WSURL,
      containerId: container.id,
      containerName: name,
    }, "Container created and startes successfully"))
})



export { createContainer }