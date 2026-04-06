import { Router } from "express";
import { createSprint, getSprintsByProject, updateSprintStatus } from "../controllers/sprint.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);

router.post("/", createSprint);
router.get("/project/:projectId", getSprintsByProject);
router.patch("/:id/status", updateSprintStatus);

export default router;
