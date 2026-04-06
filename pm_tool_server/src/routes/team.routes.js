import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import {
  getTeams,
  createTeam,
  updateTeamUtilization
} from "../controllers/team.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getTeams);

router.post(
  "/",
  authorize(
    "super_admin",
    "manager",
    "resource_manager",
    "project_manager",
    "team_lead"
  ),
  createTeam
);


router.patch(
  "/:id/utilization",
  authorize("manager", "resource_manager"),
  updateTeamUtilization
);

export default router;
