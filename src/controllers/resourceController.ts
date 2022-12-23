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
