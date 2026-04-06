import { Router } from "express"
import { createOrganization } from "../controllers/organization.controller.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = Router()

// 🔐 Protected
router.post("/", protect, createOrganization)

export default router
