import Organization from "../models/Organization.js"

/**
 * @desc   Create new organization
 * @route  POST /api/v1/organizations
 * @access Super Admin only
 */
export const createOrganization = async (req, res) => {
  try {
    // 🔐 Only super_admin can create org
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Only super admin can create organizations"
      })
    }

    const { name, slug } = req.body

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required"
      })
    }

    const org = await Organization.create({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      organization: org
    })
  } catch (error) {
    console.error("❌ Create Organization Error:", error)

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
