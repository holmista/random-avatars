import { Router } from "express";
import {
  getResources,
  getUnapprovedResources,
  getUnapprovedResource,
  approveResource,
  rejectResource,
} from "../controllers/resourceController.js";
const router = Router();

router.get("/available-resources", getResources);
router.get("/unapproved-resources", getUnapprovedResources);
router.get("/unapproved-resources/:resource", getUnapprovedResource);
router.get("/approve-resource/:resource", approveResource);
router.get("/reject-resource/:resource", rejectResource);
export default router;
