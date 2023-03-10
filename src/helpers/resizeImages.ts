import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../public");

const sizes = { small: 60, medium: 100, large: 120 };

const resizeImage = (
  imagePath: string,
  to: string,
  width: number,
  height: number
) => {
  sharp(imagePath)
    .resize(width, height)
    .toFile(to, function (err) {
      console.log(err);
    });
};

const resizeImages = async (
  rawFolderPath: string,
  resizedFolderPath: string,
  resource: string
) => {
  const images = await fs.readdir(path.join(publicPath, rawFolderPath));
  for (let j of Object.keys(sizes)) {
    for (let i of images) {
      const extension = path.extname(i);
      resizeImage(
        path.join(publicPath + rawFolderPath, i), // /jojo/raw
        path.join(
          publicPath + resizedFolderPath + "/" + j,
          `${resource}-${j}-${images.indexOf(i)}${extension}`
        ),
        sizes[j],
        sizes[j]
      );
    }
  }
};

export default resizeImages;

// const resource = process.argv.slice(2)[0];
// saveResizedImages(`/${resource}/raw`, `/${resource}/resized`, resource);
