import React from "react";
import { api } from "../api/axios.js";

export default function VideoPlayer({ id, onBack }) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const src = `${base}/api/videos/${id}/stream`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 flex flex-col items-center justify-center p-6 text-white">
      {/* Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300 shadow-md"
        >
          ⬅️ Back to Library
        </button>

        <h2 className="text-2xl font-bold tracking-wide">🎬 Video Player</h2>
      </div>

      {/* Player Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
        <video
          src={src}
          controls
          className="w-full rounded-xl border border-white/20 shadow-md"
        />
        <div className="mt-4 flex justify-between text-sm text-gray-300">
          <span>Now Playing: <strong className="text-white">{id}</strong></span>
          <span className="italic text-gray-400">HD • Streaming securely</span>
        </div>
      </div>
    </div>
  );
}
