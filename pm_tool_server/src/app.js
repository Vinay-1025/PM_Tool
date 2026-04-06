import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import apiRoutes from "./routes/index.js"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express()

app.use(cors({
  origin: ["http://localhost:5174","http://localhost:5173"],
  credentials: true
}))
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.use("/api/v1", apiRoutes)
app.use(errorHandler)

export default app
