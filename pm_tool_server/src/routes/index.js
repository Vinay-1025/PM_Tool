import { Router } from "express"

import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"
import adminRoutes from "./admin.routes.js"
import githubRoutes from "./integrations/github.routes.js"
import taskRoutes from "./task.routes.js"
import metricsRoutes from "./metrics.routes.js"
import organizationRoutes from "./organization.routes.js"
import vscodeRoutes from "./vscode.routes.js"
import teamRoutes from "./team.routes.js"
import projectRoutes from "./project.routes.js"
import timesheetRoutes from "./timesheet.routes.js"
import sprintRoutes from "./sprint.routes.js"
import releaseRoutes from "./release.routes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/admin", adminRoutes)

router.use("/integrations/github", githubRoutes);
router.use("/tasks", taskRoutes)
router.use("/metrics", metricsRoutes)
router.use("/organizations", organizationRoutes)
router.use("/projects", projectRoutes)

router.use("/vscode", vscodeRoutes)
router.use("/teams", teamRoutes)
router.use("/timesheets", timesheetRoutes)
router.use("/sprints", sprintRoutes)
router.use("/releases", releaseRoutes)

export default router
