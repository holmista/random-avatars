import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer();
import {
  getRandomImageUrl,
  getRandomImage,
  createRawImages,
  createResizedImages,
} from "../controllers/imageController.js";
import createImagesMiddleware from "../middlewares/createImagesMiddleware.js";

// get random image path from folder
router.get("/random/:size", getRandomImage);
router.get("/:folder/random/:size", getRandomImageUrl);

router.post(
  "/",
  upload.array("images"),
  createImagesMiddleware,
  createRawImages
);

// router.post("/resize", createResizedImages);

export default router;
