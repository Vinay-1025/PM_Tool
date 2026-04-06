import { Router } from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { myGithubMetrics, myProductivityDashboard } from "../controllers/metrics.controller.js"

const router = Router()

router.get("/github/me", protect, myGithubMetrics)
router.get("/productivity/me", protect, myProductivityDashboard)

export default router
