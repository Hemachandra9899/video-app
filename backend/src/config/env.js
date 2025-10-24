export const loadEnv = () => ({
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/videoapp",
  JWT_SECRET: process.env.JWT_SECRET || "change-me",
  STORAGE_KIND: process.env.STORAGE_KIND || "local",
  STORAGE_DIR: process.env.STORAGE_DIR || "./data",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173"
});
