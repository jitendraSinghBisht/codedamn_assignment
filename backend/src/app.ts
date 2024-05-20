import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

//routes import
import userRoute from "./routes/user.routes.js";
import containerRoute from "./routes/container.routes.js";
import fileRoute from "./routes/file.routes.js";

//routes
app.use("/api/user", userRoute);
app.use("/api/container", containerRoute);
app.use("/api/file", fileRoute);

export { app };