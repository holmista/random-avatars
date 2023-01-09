import { Router } from "express";
const router = Router();
import AuthController from "../controllers/authController.js";
import LoginMiddleware from "../middlewares/LoginMiddleware.js";
// import validateData from "../middlewares/loginMiddleware.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/login", (req, res, next) => {
  new LoginMiddleware(req, res, next);
  const authController = new AuthController(req, res);
  authController.login(req.body.username, req.body.password);
});
// router.get("/me", authMiddleware, (req, res) => {
//   res.json({ message: "authorized" });
// });

export default router;
