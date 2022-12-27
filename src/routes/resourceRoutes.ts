import { Router } from "express";
import {
  getResources,
  getUnapprovedResources,
  getUnapprovedResource,
  approveResource,
  rejectResource,
} from "../controllers/resourceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/available-resources", getResources);
router.get("/unapproved-resources", authMiddleware, getUnapprovedResources);
router.get(
  "/unapproved-resources/:resource",
  authMiddleware,
  getUnapprovedResource
);
router.get("/approve-resource/:resource", authMiddleware, approveResource);
router.get("/reject-resource/:resource", authMiddleware, rejectResource);
export default router;
