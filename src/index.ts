import express from "express";
import imageRouter from "./routes/imageRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import authRouter from "./routes/authRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res
      .status(204)
      .header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/images", imageRouter);
app.use("/info", resourceRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(process.env.PORT, () => console.log("listening to port 3000"));

["uncaughtException", "unhandledRejection"].forEach((event) => {
  process.on(event, (error) => {
    console.log(event, error);
  });
});
