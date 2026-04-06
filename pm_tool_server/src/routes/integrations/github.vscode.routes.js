import { Router } from "express"
import {
  vscodeGithubConnect,
  vscodeGithubCallback
} from "../../controllers/github.vscode.controller.js"

const router = Router()

router.get("/vscode/connect", vscodeGithubConnect)
router.get("/vscode/callback", vscodeGithubCallback)

export default router
