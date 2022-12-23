import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    if (
      id === process.env.ADMIN_ID &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ id }, process.env.JWT_SECRET);
      res
        .status(200)
        .cookie("access_token", token, {
          domain: process.env.FRONT_TOP_LEVEL_DOMAIN,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: (process.env.JWT_EXPIRES_IN as unknown as number) * 100,
        })
        .json({ message: "logged in" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "could not log in, try again later" });
  }
};
