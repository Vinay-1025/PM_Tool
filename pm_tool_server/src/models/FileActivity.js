import mongoose from "mongoose"

const fileActivitySchema = new mongoose.Schema(
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
    filePath: String,
    language: String,
    durationMs: Number,
    idleDurationMs: {
      type: Number,
      default: 0
    },
    activeTypingMs: {
      type: Number,
      default: 0
    },
    linesModifiedCount: {
      type: Number,
      default: 0
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export default mongoose.model("FileActivity", fileActivitySchema)
