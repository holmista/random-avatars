import { Router } from "express";
import { getResources } from "../controllers/resourceController.js";
const router = Router();

// get random image path from folder
router.get("/available-resources", getResources);

export default router;
