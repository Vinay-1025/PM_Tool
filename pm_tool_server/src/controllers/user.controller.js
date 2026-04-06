import User from "../models/User.js"

export const createUser = async (req, res) => {
  const { name, email, password, role, orgId } = req.body

  // 🔐 Role check
  if (
    !["super_admin", "it_admin", "hr_manager"].includes(req.user.role)
  ) {
    return res.status(403).json({
      message: "You are not allowed to create users"
    })
  }

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" })
  }

  if (role === "super_admin") {
    return res.status(403).json({
      message: "Super admin cannot be created via API"
    })
  }

  if (!orgId && req.user.role !== "super_admin") {
    return res.status(400).json({
      message: "orgId is required"
    })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({
      message: "User with this email already exists"
    })
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    orgId
  })

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      orgId: user.orgId
    }
  })
}

export const getUsersForTeam = async (req, res) => {
  const { roles } = req.query

  const query = {
    orgId: req.user.orgId,
    isActive: true
  }

  if (roles) {
    query.role = { $in: roles.split(",") }
  }

  const users = await User.find(query)
    .select("name email role")

  res.json(users)
}


export const updateTheme = async (req, res) => {
  const { theme } = req.body

  if (!["light", "dark"].includes(theme)) {
    return res.status(400).json({ message: "Invalid theme" })
  }

  req.user.theme = theme
  await req.user.save()

  res.json({ theme })
}
