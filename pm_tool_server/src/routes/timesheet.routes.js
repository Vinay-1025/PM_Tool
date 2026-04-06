import { Router } from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
  upsertTimesheet,
  submitTimesheet,
  getMyTimesheets,
  getMonthlySummary,
  getPendingApprovals,
  approveTimesheet,
  getAuditTimeline
} from "../controllers/timesheet.controller.js"

const router = Router()

/* Employee */
router.post("/", protect, upsertTimesheet)
router.get("/my", protect, getMyTimesheets)
router.get("/summary", protect, getMonthlySummary)
router.post("/:id/submit", protect, submitTimesheet)

/* Manager */
router.get("/pending", protect, getPendingApprovals)
router.post("/:id/approve", protect, approveTimesheet)

/* Audit */
router.get("/:id/audit", protect, getAuditTimeline)

export default router
