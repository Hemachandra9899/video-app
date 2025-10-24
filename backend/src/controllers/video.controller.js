import fs from "fs";
import Video from "../models/Video.js";
import { saveUploadedFile } from "../utils/storage.js";
import { startProcessing } from "../services/processing.service.js";
import { streamWithRange } from "../utils/range.js";

export async function uploadVideo(req, res, next) {
  try {
    const { title } = req.body;
    const saved = await saveUploadedFile(req.file); // { keyOrPath, size, mimeType, filename }
    const video = await Video.create({
      orgId: req.orgId, ownerId: req.user.uid, title: title || req.file.originalname,
      filename: saved.filename, mimeType: saved.mimeType, size: saved.size,
      storage: { kind: "local", keyOrPath: saved.keyOrPath }, status: "uploaded"
    });
    startProcessing(video._id).catch(console.error);
    res.status(201).json({ id: video._id });
  } catch (e) { next(e); }
}

export async function listVideos(req, res, next) {
  try {
    const q = { orgId: req.orgId };
    if (req.query.status) q.status = req.query.status;
    const videos = await Video.find(q).sort({ createdAt: -1 }).limit(50);
    res.json(videos);
  } catch (e) { next(e); }
}

export async function getVideo(req, res, next) {
  try {
    const v = await Video.findOne({ _id: req.params.id, orgId: req.orgId });
    if (!v) return res.status(404).json({ error: "Not found" });
    res.json(v);
  } catch (e) { next(e); }
}

export async function streamVideo(req, res, next) {
  try {
    const v = await Video.findOne({ _id: req.params.id, orgId: req.orgId });
    if (!v) return res.status(404).json({ error: "Not found" });
    const filePath = v.storage.keyOrPath;
    const stat = fs.statSync(filePath);
    streamWithRange(req, res, {
      filePath,
      fileSize: stat.size,
      contentType: v.mimeType || "video/mp4"
    });
  } catch (e) { next(e); }
}
