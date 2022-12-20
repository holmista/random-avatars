import fs from "fs/promises";
import { Request, Response, NextFunction } from "express";

const createImagesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = req.body.resource;
    const regex = /^[a-z-]+$/;
    if (!resource) {
      res.status(422).json({ error: "resource is required" });
      return;
    }
    if (!req.files) {
      res.status(422).json({ error: "images are required" });
      return;
    }
    if (req.files.length !== 10) {
      res.status(422).json({ error: "10 images should be uploaded" });
      return;
    }
    if (resource.toLowerCase() !== resource) {
      res.status(422).json({ error: "resource name must be lowercase" });
      return;
    }
    if (!regex.test(resource)) {
      res.status(422).json({
        error:
          "resource name must be lowercase letters and contain hyphens as separator",
      });
      return;
    }
    const resources = await fs.readdir("public");
    if (resources.includes(resource)) {
      res.status(422).json({ error: "resource already exists" });
      return;
    }
    next();
  } catch (err) {
    res
      .status(500)
      .json({ error: "unexpected error occurred, try again later" });
  }
};

export default createImagesMiddleware;
