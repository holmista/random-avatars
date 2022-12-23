import { Router } from "express";
const router = Router();
import { login } from "../controllers/authController.js";
import validateData from "../middlewares/loginMiddleware.js";

router.post("/login", validateData, login);

export default router;
