import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/messages.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ allow frontend origin
    credentials: true, // ✅ if you ever send cookies (optional)
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

export { app };
