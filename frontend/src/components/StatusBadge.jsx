import React from "react";

export default function StatusBadge({ status }) {
  const color = status === "ready" ? "green" :
                status === "processing" ? "orange" :
                status === "error" ? "red" : "gray";
  return <span style={{ color, fontWeight: 600 }}>{status}</span>;
}
