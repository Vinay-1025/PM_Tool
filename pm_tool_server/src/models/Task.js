import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    /* Core */
    title: { type: String, required: true },
    description: { type: String }, // HTML supported

    taskKey: {
      type: String,
      unique: true,
      sparse: true
    },

    /* Type */
    todoType: {
      type: String,
      enum: ["default", "personal", "private"],
      default: "default"
    },

    issueType: {
      type: String,
      enum: ["epic", "story", "task", "subtask", "bug"],
      default: "task"
    },

    /* Visibility */
    visibility: {
      type: [String],
      enum: ["all", "employee", "contractor", "customer", "intern"],
      default: ["all"]
    },

    /* Status & Priority */
    status: {
      type: String,
      enum: ["todo", "progress", "review", "blocked", "done"],
      default: "todo"
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium"
    },

    startDate: Date,
    /* Dates */
    dueDate: Date,

    estimatedTime: {
      internal: { type: Number }, // hours
      external: { type: Number }  // hours
    },

    /* Relations */
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },

    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint"
    },

    storyPoints: {
      type: Number,
      default: 0
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    watchers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    /* Category */
    category: String,

    /* Hierarchy */
    parentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },

    relatedTasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }],

    linkedTasks: [{
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      },
      linkType: {
        type: String,
        enum: ["blocks", "is_blocked_by", "relates_to", "duplicates"]
      }
    }],

    /* Release */
    release: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Release"
    },

    /* Attachments */
    attachments: [{
      name: String,
      url: String,
      size: Number
    }],

    /* Meta */
    postToShoutout: { type: Boolean, default: false },

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

export default mongoose.model("Task", taskSchema);
