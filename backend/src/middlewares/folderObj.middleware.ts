import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Volume } from "../models/volume.model.js";
import { Document } from "mongoose";

export const setVolume = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, volumeName }: {user: Document, volumeName: string} = req.body

    if (!volumeName) {
      throw new ApiError(400, "Volume Name is required");
    }

    const volumedb = await Volume.find({owner: user._id, volumeName})

    if (!volumedb) {
      throw new ApiError(400, "Invalid volume name");
    }

    req.body.volumedb = volumedb[0];
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid Volume Name");
  }
});
