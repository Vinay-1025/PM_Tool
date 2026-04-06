import User from "../models/User.js"
import { signToken } from "../utils/jwt.js"

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select("+password")
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = signToken({
    userId: user._id,
    orgId: user.orgId,
    role: user.role
  })

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      user
    })
}

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true })
}
