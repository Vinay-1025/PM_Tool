import mongoose from "mongoose"

const timesheetItemSchema = new mongoose.Schema({
  from: String, // "09:30"
  to: String,   // "12:00"
  minutes: Number,

  type: {
    type: String,
    enum: ["development", "testing", "meeting", "support"],
    required: true
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  release: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Release"
  },

  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  },

  description: String
})

const timesheetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    workStatus: {
      type: String,
      enum: ["at_work", "wfh", "leave", "holiday"],
      required: true
    },

    items: [timesheetItemSchema],

    totalMinutes: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft"
    },

    submittedAt: Date,
    approvedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

/* 🚀 Indexes for performance */
timesheetSchema.index({ user: 1, date: 1 }, { unique: true })
timesheetSchema.index({ orgId: 1, date: 1 })
timesheetSchema.index({ status: 1 })

export default mongoose.model("Timesheet", timesheetSchema)
