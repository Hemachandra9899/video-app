import React from "react";
import { api } from "../api/axios.js";

export default function VideoPlayer({ id, onBack }) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const src = `${base}/api/videos/${id}/stream`;
  return (
    <div style={{ padding: 16 }}>
      <button onClick={onBack}>Back</button>
      <h2>Player</h2>
      <video src={src} controls width="720" />
    </div>
  );
}
