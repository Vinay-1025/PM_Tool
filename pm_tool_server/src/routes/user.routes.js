import { Router } from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
  createUser,
  getUsersForTeam,
  updateTheme
} from "../controllers/user.controller.js"

const router = Router()

router.post("/", protect, createUser)

router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    orgId: req.user.orgId,
    theme: req.user.theme // 👈 IMPORTANT
  })
})

router.patch("/theme", protect, updateTheme)

router.get("/team-users", protect, getUsersForTeam)

export default router
