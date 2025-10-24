import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org", required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  filename: String,
  mimeType: String,
  size: Number,
  duration: Number,
  status: { type: String, enum: ["uploaded", "processing", "ready", "error"], default: "uploaded" },
  sensitivity: { score: Number, label: { type: String, enum: ["safe", "flagged"] } },
  storage: { kind: { type: String, enum: ["local"], default: "local" }, keyOrPath: String }
}, { timestamps: true });

export default mongoose.model("Video", VideoSchema);
