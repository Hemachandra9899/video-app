import Video from "../models/Video.js";
import { getIO } from "../sockets/index.js";

export async function startProcessing(videoId) {
  const v = await Video.findById(videoId);
  if (!v) return;
  const nsp = getIO().of("/videos");

  await Video.updateOne({ _id: videoId }, { $set: { status: "processing" } });
  nsp.emit("processing:started", { videoId });

  for (let p = 0; p <= 100; p += 20) {
    await new Promise(r => setTimeout(r, 300));
    nsp.emit("processing:progress", { videoId, progress: p });
  }

  await Video.updateOne({ _id: videoId }, {
    $set: { status: "ready", sensitivity: { score: 0.02, label: "safe" } }
  });
  nsp.emit("processing:completed", { videoId, sensitivity: { score: 0.02, label: "safe" } });
}
