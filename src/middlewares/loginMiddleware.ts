import { Request, Response, NextFunction } from "express";

const validateData = (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req.body;
  if (id && password) {
    next();
  } else {
    res.status(422).json({ message: "Missing id or password" });
    return;
  }
};

export default validateData;
