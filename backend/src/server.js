import http from "http";
import app from "./app.js";
import { initSockets } from "./sockets/index.js";
import { loadEnv } from "./config/env.js";

const { PORT } = loadEnv();
const server = http.createServer(app);
initSockets(server);

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
