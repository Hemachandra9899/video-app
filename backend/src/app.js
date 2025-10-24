import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { loadEnv } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import { errorHandler } from "./middleware/error.js";

const { MONGODB_URI, CLIENT_ORIGIN } = loadEnv();
const app = express();

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

mongoose.connect(MONGODB_URI).then(() => console.log("Mongo connected")).catch(err => console.error("Mongo error", err));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// central error handler
app.use(errorHandler);

export default app;
