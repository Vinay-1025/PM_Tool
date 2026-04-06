import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRelease, getReleasesByProject } from "../controllers/release.controller.js";

const router = Router();

router.use(protect);

router.post("/", createRelease);
router.get("/project/:projectId", getReleasesByProject);

export default router;
