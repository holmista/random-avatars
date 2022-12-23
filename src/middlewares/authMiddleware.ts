import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
