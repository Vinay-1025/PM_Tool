import { Router } from "express"
import { githubWebhook } from "../../controllers/github.controller.js"

const router = Router()

// GitHub Webhook endpoint
router.post("/webhook", githubWebhook)

export default router
