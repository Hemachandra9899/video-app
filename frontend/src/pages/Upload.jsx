import React from "react";
import UploadForm from "../components/UploadForm.jsx";

export default function Upload({ onGoLibrary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-6 tracking-wide">
          🎬 Upload Your Video
        </h2>

        <p className="text-sm text-gray-200 mb-6">
          Select your video file and upload it securely. Once uploaded, head to
          your library to view or manage it.
        </p>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <UploadForm onUploaded={onGoLibrary} />
        </div>

        <button
          onClick={onGoLibrary}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          📚 Go to Library
        </button>
      </div>
    </div>
  );
}
