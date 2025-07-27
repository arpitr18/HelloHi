import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/messages.routes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import job from "./config/cron.js";

const __dirname = path.resolve();

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const userSocketMap = {};

export function getReciversScoketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("New client connected with ID:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Client disconnected with ID:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

console.log("STATIC PATH:", path.join(__dirname, "../frontend/dist"));

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For any other route, serve index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Temporarily allow cron job in development
if (process.env.NODE_ENV === "production") {
  job.start();
  console.log(`✅ Cron job started in ${process.env.NODE_ENV}`);
}

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export { app, server, io };
