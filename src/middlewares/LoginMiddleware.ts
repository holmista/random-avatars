import { Request, Response, NextFunction } from "express";
import ValidateRequest from "./ValidateRequest.js";
import jwt from "jsonwebtoken";

class LoginMiddleware extends ValidateRequest {
  public req: Request;
  public res: Response;
  public next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    super.progress();
  }
  public validate() {
    const token = this.req.cookies.access_token;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
      } catch (err) {
        return "Unauthorized";
      }
    } else {
      return "Unauthorized";
    }
  }
}

export default LoginMiddleware;
