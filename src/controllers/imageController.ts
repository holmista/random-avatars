import fs from "fs/promises";
import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

import createResourceDirectory from "../helpers/fs/createResourceDirectory.js";
import resizeImages from "../helpers/resizeImages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRandomImageUrl = async (req: Request, res: Response) => {
  try {
    const folder = req.params.folder;
    const size = req.params.size;
    const images = await fs.readdir(`public/${folder}/resized/${size}`);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const path = `${process.env.API_URL}/${folder}/resized/${size}/${randomImage}`;
    res.status(200).json({ path });
  } catch (err) {
    res.status(404).json({ error: "asset does not exist" });
  }
};

export const getRandomImage = async (req: Request, res: Response) => {
  try {
    const folders = await fs.readdir("public");
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];
    const size = req.params.size;
    const images = await fs.readdir(`public/${randomFolder}/resized/${size}`);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    res.sendFile(`/${randomFolder}/resized/${size}/${randomImage}`, {
      root: path.join(__dirname, "../../public"),
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "asset does not exist" });
  }
};

export const createRawImages = async (req: Request, res: Response) => {
  try {
    const resource = req.body.resource;
    await fs.mkdir(`public/unapproved/${resource}`);
    for (let i = 0; i < req.files.length; i++) {
      await fs.writeFile(
        `public/unapproved/${resource}/${
          i + req.files[i].originalname.replaceAll(" ", "")
        }`,
        req.files[i].buffer
      );
    }
    res.status(200).json({ message: "resource created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "resource could not be created" });
  }
};

export const createResizedImages = async (req: Request, res: Response) => {
  try {
    const resource = req.body.resource;
    resizeImages(`/${resource}/raw`, `/${resource}/resized`, resource);
  } catch (err) {
    console.log(err);
  }
};
