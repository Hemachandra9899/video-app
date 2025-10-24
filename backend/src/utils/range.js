import fs from "fs";

export function streamWithRange(req, res, { filePath, fileSize, contentType }) {
  const range = req.headers.range;
  const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType
    });
    return fs.createReadStream(filePath).pipe(res);
  }
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = Math.min(parts[1] ? parseInt(parts[1], 10) : start + CHUNK_SIZE - 1, fileSize - 1);

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": contentType
  };
  res.writeHead(206, headers);
  fs.createReadStream(filePath, { start, end }).pipe(res);
}
