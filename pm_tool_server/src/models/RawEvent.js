import mongoose from "mongoose"

const rawEventSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            enum: ["github"],
            required: true
        },
        eventType: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        },
        payload: Object,
        processed: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            enum: ["github", "vscode"],
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model("RawEvent", rawEventSchema)
