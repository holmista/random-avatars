import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Controller from "./Controller.js";

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { id, password } = req.body;
//     if (
//       id === process.env.ADMIN_ID &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign({ id }, process.env.JWT_SECRET);
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           domain: process.env.FRONT_TOP_LEVEL_DOMAIN,
//           path: "/",
//           httpOnly: true,
//           secure: true,
//           sameSite: "strict",
//           maxAge: (process.env.JWT_EXPIRES_IN as unknown as number) * 100,
//         })
//         .json({ message: "logged in" });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "could not log in, try again later" });
//   }
// };

interface IJwtPayload {
  id: string | number;
  username: string;
  email?: string;
}

interface ILogin {
  login: (username: string, password: string) => Response;
}

class AuthController extends Controller implements ILogin {
  public req: Request;
  public res: Response;
  constructor(req: Request, res: Response) {
    super(req, res);
  }
  public login(username: string, password: string) {
    if (
      username === process.env.ADMIN_ID &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = this.createJWT({ id: 1, username });
      this.cookies.createCookie("access_token", token, {
        domain: process.env.FRONT_TOP_LEVEL_DOMAIN,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: (process.env.JWT_EXPIRES_IN as unknown as number) * 100,
      });
      return this.sendResponse(200, "logged in", "application/json");
    }
  }
  public createJWT(payload: IJwtPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
}
