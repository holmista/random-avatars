import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import directoryExists from "./directoryExists.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../../public");

const deleteResizedDirectories = async (resource: string) => {
  try {
    const exists = await directoryExists(`${publicPath}/${resource}`);
    if (!exists) {
      return;
    }
    const larges = await fs.readdir(`${publicPath}/${resource}/resized/large`);
    const mediums = await fs.readdir(
      `${publicPath}/${resource}/resized/medium`
    );
    const smalls = await fs.readdir(`${publicPath}/${resource}/resized/small`);
    for (let i of larges) {
      fs.unlink(`${publicPath}/${resource}/resized/large/${i}`);
    }
    for (let i of mediums) {
      fs.unlink(`${publicPath}/${resource}/resized/medium/${i}`);
    }
    for (let i of smalls) {
      fs.unlink(`${publicPath}/${resource}/resized/small/${i}`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const resource = process.argv.slice(2)[0];
deleteResizedDirectories(resource);
