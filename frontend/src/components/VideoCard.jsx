import React from "react";
import StatusBadge from "./StatusBadge.jsx";

export default function VideoCard({ v, onOpen }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{v.title || v.filename}</strong>
        <StatusBadge status={v.status} />
      </div>
      {v.sensitivity?.label && <div>Sensitivity: {v.sensitivity.label} (score {v.sensitivity.score ?? "-"})</div>}
      <button onClick={onOpen} disabled={v.status !== "ready"}>Open</button>
    </div>
  );
}
