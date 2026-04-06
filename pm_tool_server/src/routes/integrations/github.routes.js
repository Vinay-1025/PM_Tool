import { Router } from "express"
import {
  githubAuthRedirect,
  githubOAuthCallback
} from "../../controllers/github.oauth.controller.js"

import githubWebhookRoutes from "./github.webhook.routes.js"
import { protect } from "../../middlewares/authMiddleware.js"
import { githubVSCodeRedirect } from "../../controllers/github.vscode.controller.js"
import { githubVSCodeCallback } from "../../controllers/github.vscode.callback.js"

const router = Router()

// OAuth
router.get("/connect", protect, githubAuthRedirect)
router.get("/callback", githubOAuthCallback)

// Webhook (NO AUTH, GitHub cannot send JWT)
router.use("/", githubWebhookRoutes)


// src/routes/integrations/github.routes.js
router.get("/vscode/connect", githubVSCodeRedirect);
router.get("/vscode/callback", githubVSCodeCallback);

export default router
