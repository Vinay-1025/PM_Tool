import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: [
                "super_admin",
                "ceo",
                "cto",
                "coo",
                "cfo",
                "higher_official",
                "program_manager",
                "delivery_manager",
                "project_manager",
                "resource_manager",
                "manager",
                "team_lead",
                "hr_manager",
                "hr_assistant",
                "it_admin",
                "member",
                "intern",
                "contractor",
                "client",
                "readonly_user"
            ],
            default: "member"
        },
        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: function () {
                return this.role !== "super_admin"
            }
        },

        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light"
        },

        github: {
            githubUserId: {
                type: Number,
                unique: true,
                sparse: true
            },
            username: String,
            avatarUrl: String,
            profileUrl: String,
            linkedAt: Date
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

/* 🔐 Password hashing */
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 12)
})

/* 🔐 Compare password */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

/* 🔥 HARD RULE: Only one super_admin */
userSchema.pre("save", async function () {
    if (this.role === "super_admin" && this.isNew) {
        const existing = await mongoose.models.User.findOne({
            role: "super_admin"
        })
        if (existing) {
            throw new Error("Super admin already exists")
        }
    }
})


export default mongoose.model("User", userSchema)
