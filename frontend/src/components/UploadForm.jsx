import React from "react";
import { api } from "../api/axios.js";
import { makeVideoSocket } from "../sockets/socket.js";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [live, setLive] = React.useState({});

  async function upload() {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post("/api/videos", form, {
      onUploadProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100))
    });

    const socket = makeVideoSocket();
    socket.on("processing:started", ({ videoId }) => setLive({ videoId, progress: 0 }));
    socket.on("processing:progress", ({ videoId, progress }) => setLive({ videoId, progress }));
    socket.on("processing:completed", ({ videoId }) => {
      setLive({ videoId, progress: 100 });
      onUploaded?.();
      socket.close();
    });
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={upload} disabled={!file}>Upload</button>
      {progress > 0 && <div>Upload: {progress}%</div>}
      {live.videoId && <div>Processing: {live.progress}%</div>}
    </div>
  );
}
