import React from "react";
import { api } from "../api/axios.js";
import VideoCard from "../components/VideoCard.jsx";

export default function Library({ onOpen }) {
  const [items, setItems] = React.useState([]);

  async function load() {
    const { data } = await api.get("/api/videos");
    setItems(data);
  }

  React.useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Library</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(v => <VideoCard key={v._id} v={v} onOpen={() => onOpen(v._id)} />)}
      </div>
    </div>
  );
}
