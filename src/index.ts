import express from "express";
import imageRouter from "./routes/imageRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.static("public"));
app.use("/images", imageRouter);
app.use("/info", resourceRouter);

app.listen(3000, () => console.log("listening to port 3000"));

["uncaughtException", "unhandledRejection"].forEach((event) => {
  process.on(event, (error) => {
    console.log(event, error);
  });
});
