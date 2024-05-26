import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({credentials: true, origin: `${process.env.CORS_ORIGIN}`}));
app.use(express.json());
app.use(cookieParser());

//routes import
import userRoute from "./routes/user.routes.js";
import containerRoute from "./routes/container.routes.js";
import fileRoute from "./routes/file.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";

//routes
app.use("/api/user", userRoute);
app.use("/api/container", containerRoute);
app.use("/api/file", fileRoute);
app.get("/api/hello",(req,res)=> res.status(200).json(new ApiResponse(200,{"hello":"world"},"all good")))
export { app };