import { Router } from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"

const router = Router()

router.get(
  "/system-stats",
  protect,
  authorize("super_admin"),
  (req, res) => {
    res.json({ message: "System stats visible only to super admin" })
  }
)

export default router
