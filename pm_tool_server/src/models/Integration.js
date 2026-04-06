import mongoose from "mongoose"

const integrationSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },
    provider: {
      type: String,
      enum: ["github"],
      required: true
    },
    metadata: {
      githubOrg: String,
      repos: [String]
    },
    connectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Integration", integrationSchema)
