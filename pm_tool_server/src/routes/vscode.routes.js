// src/routes/vscode.routes.js
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getMyTasks,
  startSession,
  heartbeat,
  recordFileActivity
} from "../controllers/vscode.controller.js";

const router = Router();

router.use(protect);

router.get("/tasks", getMyTasks);
router.post("/session/start", startSession);
router.post("/session/heartbeat", heartbeat);
router.post("/activity/files", recordFileActivity);

export default router;
