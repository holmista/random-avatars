import { Request, Response, NextFunction } from "express";
import ValidateRequest from "./ValidateRequest.js";

class LoginMiddleware extends ValidateRequest {
  public req: Request;
  public res: Response;
  public next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    super.progress();
  }
  public validate(): boolean | string {
    if (!this.req.body.username || !this.req.body.password) {
      return "username or password is missing";
    }
    return true;
  }
}

export default LoginMiddleware;
