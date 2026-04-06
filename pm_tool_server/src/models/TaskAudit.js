import mongoose from "mongoose";

const taskAuditSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },

    action: {
      type: String,
      enum: ["DATE_CHANGED", "STATUS_CHANGED", "CREATED"],
      required: true
    },

    oldValue: Object,
    newValue: Object,

    comment: {
      type: String,
      required: true
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("TaskAudit", taskAuditSchema);
