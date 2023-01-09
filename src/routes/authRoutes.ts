import { Router } from "express";
const router = Router();
import AuthController from "../controllers/authController.js";
import LoginMiddleware from "../middlewares/LoginMiddleware.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

router.post(
  "/login",
  (req, res, next) => {
    new LoginMiddleware(req, res, next);
  },
  (req, res) => {
    const authController = new AuthController(req, res);
    authController.login(req.body.username, req.body.password);
  }
);
router.get("/me", (req, res, next) => {
  new AuthMiddleware(req, res, next);
});

export default router;
