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

router.route("/read-file/:fileId").get(readFile)
router.route("/delete-file/:fileId").delete(deleteFile)
router.route("/update-file/:fileId").patch(updateFile)
router.route("/create-file/:folderId").post(createFile)
router.route("/create-folder/:folderId").post(createFolder)
router.route("/delete-folder/:folderId").delete(deleteFolder)

export default router