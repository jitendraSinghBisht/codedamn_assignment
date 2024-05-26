import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { setVolume } from "../middlewares/folderObj.middleware.js";
import {
  readFile,
  deleteFile,
  updateFile,
  createFile,
  createFolder,
  deleteFolder
} from "../controllers/file.controller.js"

const router = Router()

router.use(verifyUser);
router.use(setVolume);

router.route("/read-file/:fileId").post(readFile)
router.route("/delete-file/:fileId").patch(deleteFile)
router.route("/update-file/:fileId").patch(updateFile)
router.route("/create-file/:folderId").post(createFile)
router.route("/create-folder/:folderId").post(createFolder)
router.route("/delete-folder/:folderId").patch(deleteFolder)

export default router