import mongoose from "mongoose"

const holidaySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: String,
    type: {
      type: String,
      enum: ["public", "company"],
      default: "public"
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    }
  },
  { timestamps: true }
)

holidaySchema.index({ date: 1, orgId: 1 })

export default mongoose.model("Holiday", holidaySchema)
