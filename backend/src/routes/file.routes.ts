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

router.route("/:fileId")
  .get(readFile)
  .delete(deleteFile)
  .patch(updateFile)

router.route("/:folderId")
  .post(createFile)
  .patch(createFolder)
  .delete(deleteFolder)

export default router