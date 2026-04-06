import mongoose from "mongoose"

const vscodeSessionSchema = new mongoose.Schema(
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
    workspace: String,
    startedAt: {
      type: Date,
      default: Date.now
    },
    lastHeartbeat: Date,
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("VSCodeSession", vscodeSessionSchema)
