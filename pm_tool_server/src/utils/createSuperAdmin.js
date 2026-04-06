import User from "../models/User.js"

const createSuperAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "super_admin" })

  if (existingAdmin) {
    console.log("Super admin already exists")
    return
  }

  const admin = await User.create({
    name: process.env.SUPER_ADMIN_NAME,
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
    role: "super_admin"
  })

  console.log("Default Super Admin created:", admin.email)
}

export default createSuperAdmin
