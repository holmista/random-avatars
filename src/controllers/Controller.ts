import { Request, Response, CookieOptions } from "express";

interface Icontroller {
  sendResponse: (...args: any) => void;
}

type TResponseType = "application/json" | "text/plain" | "text/html";

class Controller implements Icontroller {
  public req: Request;
  public res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  public sendResponse(
    statusCode: number,
    message: string,
    type: TResponseType,
    data?: any
  ): Response {
    this.res.setHeader("Content-Type", type);
    this.res.setHeader("status", statusCode);
    return this.res.send({ message, data });
  }
}

export default Controller;
