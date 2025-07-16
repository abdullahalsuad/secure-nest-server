import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
    },
    policeId: {
      type: String,
      required: true,
    },
    policeName: {
      type: String,
      required: true,
    },
    assignedAgentId: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },

    documentUrl: {
      type: String,
      required: true,
    },
    claimStatus: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);
