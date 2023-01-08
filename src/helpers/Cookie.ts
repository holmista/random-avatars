import { Request, Response, CookieOptions } from "express";

class Cookie {
  public req: Request;
  public res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  public createCookie(name: string, value: string, options: CookieOptions) {
    this.res.cookie(name, value, options);
  }
  public getCookie(name: string) {
    return this.req.cookies[name];
  }
}

export default Cookie;
