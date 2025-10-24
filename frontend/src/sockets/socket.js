import { io } from "socket.io-client";

export function makeVideoSocket() {
  const url = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/videos";
  const token = localStorage.getItem("token") || "";
  return io(url, { auth: { token } });
}
