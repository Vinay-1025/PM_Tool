import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        goal: {
            type: String
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["planning", "active", "completed", "closed"],
            default: "planning"
        },
        velocity: {
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
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Sprint", sprintSchema);
