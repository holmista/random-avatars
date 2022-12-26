import { Request, Response } from "express";
import fs from "fs/promises";
import createResourceDirectory from "../helpers/fs/createResourceDirectory.js";
import resizeImages from "../helpers/resizeImages.js";

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await fs.readdir("public");
    res.status(200).json({ resources });
  } catch (err) {
    res.status(404).json({ error: "asset does not exist" });
  }
};

export const getUnapprovedResources = async (req: Request, res: Response) => {
  try {
    const resources = await fs.readdir("public/unapproved");
    res.status(200).json({ resources });
  } catch (err) {
    res.status(404).json({ error: "asset does not exist" });
  }
};

export const getUnapprovedResource = async (req: Request, res: Response) => {
  try {
    const resource = req.params.resource;
    const images = await fs.readdir(`public/unapproved/${resource}`);
    const imagesFullUrls = images.map((image) => {
      return `${process.env.API_URL}/unapproved/${resource}/${image}`;
    });
    res.status(200).json({ imagesFullUrls });
  } catch (err) {
    res.status(404).json({ error: "asset does not exist" });
  }
};

export const approveResource = async (req: Request, res: Response) => {
  try {
    const resource = req.params.resource;
    await createResourceDirectory(resource);
    const images = await fs.readdir(`public/unapproved/${resource}`);
    for (let i = 0; i < images.length; i++) {
      fs.copyFile(
        `public/unapproved/${resource}/${images[i]}`,
        `public/${resource}/raw/${images[i]}`
      );
    }
    await fs.rm(`public/unapproved/${resource}`, { recursive: true });
    await resizeImages(`/${resource}/raw`, `/${resource}/resized`, resource);
    res.status(200).json({ message: "resource approved" });
  } catch (err) {
    res.status(500).json({ error: "resource could not be approved" });
  }
};

export const rejectResource = async (req: Request, res: Response) => {
  try {
    const resource = req.params.resource;
    await fs.rm(`public/unapproved/${resource}`, { recursive: true });
    res.status(200).json({ message: "resource rejected" });
  } catch (err) {
    res.status(500).json({ error: "resource could not be rejected" });
  }
};
