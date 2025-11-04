import { Router } from "express";
import { body } from "express-validator";
import ImageController from "../controllers/ImageController";

const router = Router()

router.post("/new-image", ImageController.new);
router.post("/images", ImageController.getAll);

export default router;