import mongoose from "mongoose"

const auditSchema = new mongoose.Schema(
  {
    timesheet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timesheet",
      required: true
    },

    action: {
      type: String,
      enum: ["created", "submitted", "approved", "rejected", "edited"],
      required: true
    },

    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    comment: String
  },
  { timestamps: true }
)

export default mongoose.model("TimesheetAudit", auditSchema)
