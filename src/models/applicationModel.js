import mongoose, { mongo } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    policeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Police",
      required: true,
    },

    // Selected Duration
    duration: {
      type: String,
      required: true,
    },

    // Personal Info
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
    },
    applicantNumber: {
      type: String,
    },

    // Nominee Info
    nomineeName: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    nomineeNumber: {
      type: String,
      required: true,
    },
    nomineeAddress: {
      type: String,
      required: true,
    },

    // Health Disclosure
    healthIssues: {
      diabetes: {
        type: Boolean,
        default: false,
      },
      heart: {
        type: Boolean,
        default: false,
      },
      asthma: {
        type: Boolean,
        default: false,
      },
      none: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model("Application", applicationSchema);
