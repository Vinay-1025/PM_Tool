import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        description: String,

        projectManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },


        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        members: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            role: {
                type: String,
                enum: ["lead", "developer", "qa", "designer"],
                default: "developer"
            },
            capacity: { type: Number, default: 100 }
        }],

        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],

        utilization: {
            type: Number,
            default: 0
        },

        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
