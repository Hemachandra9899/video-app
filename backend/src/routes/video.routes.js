import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { withTenant } from "../middleware/tenant.js";
import * as controller from "../controllers/video.controller.js";
import { ensureUploadStorage } from "../utils/storage.js";

const router = Router();
const upload = multer({ dest: ensureUploadStorage() });

router.use(requireAuth, withTenant);

router.post("/", requireRole("editor", "admin"), upload.single("file"), controller.uploadVideo);
router.get("/", controller.listVideos);
router.get("/:id", controller.getVideo);
router.get("/:id/stream", controller.streamVideo);

export default router;
