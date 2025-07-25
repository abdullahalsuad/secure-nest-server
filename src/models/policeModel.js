import mongoose from "mongoose";

const policeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Term Life",
        "Senior",
        "Pension Plan",
        "Child Plan",
        "Whole Life",
        "Health + Life",
        "ULIP",
        "Family Plan",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    minAge: {
      type: String,
      required: true,
    },

    maxAge: {
      type: String,
      required: true,
    },

    coverageRange: {
      type: String,
      required: true,
    },

    durationOptions: {
      type: String,
      required: true,
    },

    basePremiumRate: {
      type: String,
      required: true,
    },

    policeImage: {
      type: String,
      required: true,
    },

    purchaseCount: {
      type: Number,
      default: 0,
    },
    // user information
    userEmail: {
      type: String,
      required: true,
    },
    // firebase id
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better search performance
policeSchema.index({ title: 'text', description: 'text' });
policeSchema.index({ category: 1 });
policeSchema.index({ createdAt: -1 });

const PoliceModel = mongoose.model("police", policeSchema);
export default PoliceModel;
