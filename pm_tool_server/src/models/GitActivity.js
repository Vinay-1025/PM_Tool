import mongoose from "mongoose"

const gitActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        repo: String,
        branch: String,
        activityType: {
            type: String,
            enum: ["commit", "pr_open", "pr_merge", "review"],
            required: true
        },
        referenceId: String, // commit SHA / PR number
        todoId: {
            type: String // AZPM-123 (optional)
        },
        linesAdded: {
            type: Number,
            default: 0
        },
        linesRemoved: {
            type: Number,
            default: 0
        },
        filesChanged: [{
            type: String
        }],
        timestamp: Date
    },
    { timestamps: true }
)

export default mongoose.model("GitActivity", gitActivitySchema)
