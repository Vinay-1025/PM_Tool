import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: String,

    methodology: {
      type: String,
      enum: ["Agile", "Waterfall", "Hybrid"],
      default: "Agile"
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Archived"],
      default: "Active"
    },

    health: {
      type: String,
      enum: ["On Track", "At Risk", "Delayed"],
      default: "On Track"
    },

    startDate: Date,
    endDate: Date,

    progress: {
      type: Number,
      default: 0
    },

    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }
    ],

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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals for deep interlinking
projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project"
});

projectSchema.virtual("sprints", {
  ref: "Sprint",
  localField: "_id",
  foreignField: "project"
});

projectSchema.virtual("releases", {
  ref: "Release",
  localField: "_id",
  foreignField: "project"
});

export default mongoose.model("Project", projectSchema);
