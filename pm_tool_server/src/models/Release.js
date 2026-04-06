import mongoose from "mongoose";

const releaseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        version: { type: String, required: true },
        description: String,

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        status: {
            type: String,
            enum: ["planning", "active", "released", "archived"],
            default: "planning"
        },

        releaseDate: Date,

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

export default mongoose.model("Release", releaseSchema);
