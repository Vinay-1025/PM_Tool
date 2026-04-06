import dotenv from "dotenv"
dotenv.config()

import app from "./src/app.js"
import connectDB from "./src/db/connectDB.js"
import createSuperAdmin from "./src/utils/createSuperAdmin.js"
import { runGithubNormalizer } from "./src/workers/githubNormalizer.worker.js"

const PORT = process.env.PORT || 5000
const GITHUB_WORKER_INTERVAL = 5000 // 5 seconds

async function startServer() {
  try {
    // 1️⃣ Connect DB
    await connectDB()

    // 2️⃣ Ensure Super Admin exists
    await createSuperAdmin()

    // 3️⃣ Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })

    // 4️⃣ Start GitHub Normalization Worker (NON-BLOCKING)
    setInterval(async () => {
      try {
        await runGithubNormalizer()
      } catch (err) {
        console.error("❌ GitHub Worker Error:", err.message)
      }
    }, GITHUB_WORKER_INTERVAL)

    console.log("🧠 GitHub Normalization Worker started")

  } catch (error) {
    console.error("❌ Server failed to start", error)
    process.exit(1)
  }
}

startServer()
