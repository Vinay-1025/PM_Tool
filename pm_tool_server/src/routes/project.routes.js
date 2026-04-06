import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import {
  getProjects,
  createProject,
  updateProjectProgress
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getProjects);

router.post(
  "/",
  authorize("super_admin", "manager", "project_manager"),
  createProject
);

router.patch(
  "/:id/progress",
  authorize("project_manager", "manager"),
  updateProjectProgress
);

export default router;
