import { Router } from "express";
const router = Router();
import { login } from "../controllers/authController.js";
import validateData from "../middlewares/loginMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/login", validateData, login);
router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "authorized" });
});

export default router;
