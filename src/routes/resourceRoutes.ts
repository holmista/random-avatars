import { Router } from "express";
import {
  getResources,
  getUnapprovedResources,
  getUnapprovedResource,
} from "../controllers/resourceController.js";
const router = Router();

router.get("/available-resources", getResources);
router.get("/unapproved-resources", getUnapprovedResources);
router.get("/unapproved-resources/:resource", getUnapprovedResource);

export default router;
