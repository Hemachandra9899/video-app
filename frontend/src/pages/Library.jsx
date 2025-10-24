import React from "react";
import { api } from "../api/axios.js";
import VideoCard from "../components/VideoCard.jsx";

export default function Library({ onOpen }) {
  const [items, setItems] = React.useState([]);

  async function load() {
    try {
      const { data } = await api.get("/api/videos");
      setItems(data);
    } catch (error) {
      console.error("Failed to load videos:", error);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            📚 Your Video Library
          </h2>
          <button
            onClick={load}
            className="px-4 py-2 rounded-lg bg-white text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition-all duration-300"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center mt-24 text-gray-300">
            <p className="text-lg">No videos found.</p>
            <p className="text-sm text-gray-400 mt-2">
              Try uploading a new video to get started!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((v) => (
              <div
                key={v._id}
                className="bg-white/10 border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => onOpen(v._id)}
              >
                <VideoCard v={v} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
