import React from "react";
import UploadForm from "../components/UploadForm.jsx";

export default function Upload({ onGoLibrary }) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Upload Video</h2>
      <UploadForm onUploaded={onGoLibrary} />
    </div>
  );
}
