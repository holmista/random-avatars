import fs from "fs/promises";

const directoryExists = async (path: string) => {
  try {
    console.log(path);
    const res = await fs.stat(path);
    return res.isDirectory();
  } catch (err) {
    return false;
  }
};

export default directoryExists;
