import { Router } from "express"
import {
  getTasks,
  createTask,
  updateTaskDueDate,
  updateTaskStatus,
  assignToSprint,
  linkTasks
} from "../controllers/task.controller.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = Router()

// 🔐 PROTECT ALL TASK ROUTES
router.use(protect)

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:id/due-date", updateTaskDueDate)
router.patch("/:id/status", updateTaskStatus)
router.post("/:id/sprint", assignToSprint)
router.post("/:id/link", linkTasks)

export default router
