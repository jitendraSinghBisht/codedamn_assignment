import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createContainer, getOldVolumes, getFolderStructure } from "../controllers/container.controller.js"

const router = Router();

router.use(verifyUser);
router.route("/create").post(createContainer);
router.route("/get-old-volumes").get(getOldVolumes);
router.route("/get-root-structure").get(getFolderStructure);

export default router;