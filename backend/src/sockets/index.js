import { Server } from "socket.io";

let io;

export function initSockets(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  const nsp = io.of("/videos");
  nsp.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
