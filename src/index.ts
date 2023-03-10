import express from "express";
import imageRouter from "./routes/imageRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res
      .status(204)
      .header("Access-Control-Allow-Origin", process.env.FRONT_BASE_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }
  res.header("Access-Control-Allow-Origin", process.env.FRONT_BASE_URL);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use("/unapproved", authMiddleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/images", imageRouter);
app.use("/resource", resourceRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(process.env.PORT, () =>
  console.log("listening to port " + process.env.PORT)
);

["uncaughtException", "unhandledRejection"].forEach((event) => {
  process.on(event, (error) => {
    console.log(event, error);
  });
});
