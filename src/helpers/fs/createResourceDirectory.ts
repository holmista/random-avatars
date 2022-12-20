import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import directoryExists from "./directoryExists.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../../public");

const createResourceDirectory = async (resource: string) => {
  try {
    const exists = await directoryExists(`${publicPath}/${resource}`);
    if (exists) {
      await fs.rm(`${publicPath}/${resource}`, { recursive: true });
    }
    await fs.mkdir(`${publicPath}/${resource}`);
    await fs.mkdir(`${publicPath}/${resource}/raw`);
    await fs.mkdir(`${publicPath}/${resource}/resized`);
    await fs.mkdir(`${publicPath}/${resource}/resized/large`);
    await fs.mkdir(`${publicPath}/${resource}/resized/medium`);
    await fs.mkdir(`${publicPath}/${resource}/resized/small`);
  } catch (err) {
    throw new Error(err);
  }
};

export default createResourceDirectory;
