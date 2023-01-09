import { Request, Response, NextFunction } from "express";

class ValidateRequest {
  public req: Request;
  public res: Response;
  public next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  public validate(): boolean | string {
    return true;
  }
  protected progress() {
    const valid = this.validate();
    if (valid === true) {
      this.next();
    } else {
      return this.res.status(422).json({ message: valid });
    }
  }
}

export default ValidateRequest;
