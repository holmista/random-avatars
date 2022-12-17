import { Router } from "express";
const router = Router();
import {
  getRandomImageUrl,
  getRandomImage,
} from "../controllers/imageController.js";

// get random image path from folder
router.get("/random/:size", getRandomImage);
router.get("/:folder/random/:size", getRandomImageUrl);

export default router;
