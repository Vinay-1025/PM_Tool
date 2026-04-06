import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  let token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ message: "User inactive or not found" })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}
