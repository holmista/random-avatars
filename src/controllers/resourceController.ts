import { Request, Response } from "express";
import fs from "fs/promises";

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await fs.readdir("public");
    res.status(200).json({ resources });
  } catch (err) {
    res.status(404).json({ error: "asset does not exist" });
  }
};
