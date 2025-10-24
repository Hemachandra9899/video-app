import fs from "fs";
import path from "path";
import mime from "mime";

export function ensureUploadStorage() {
  const dir = process.env.STORAGE_DIR || "./data";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export async function saveUploadedFile(file) {
  const destDir = ensureUploadStorage();
  const target = path.join(destDir, file.filename);
  const ext = path.extname(file.originalname) || `.${(file.mimetype || "video/mp4").split("/")[1]}`;
  const finalPath = path.join(destDir, `${file.filename}${ext}`);
  fs.renameSync(target, finalPath);
  return {
    keyOrPath: finalPath,
    filename: file.originalname,
    size: file.size,
    mimeType: file.mimetype || mime.getType(ext) || "video/mp4"
  };
}
