import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ValidateRequest from "./ValidateRequest.js";

class AuthMiddleware {
  public req: Request;
  public res: Response;
  public next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.authorize() ? this.next() : this.res.status(401).send("Unauthorized");
  }
  public authorize(): boolean | string {
    const token = this.req.cookies.access_token;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  }
}

export default AuthMiddleware;
