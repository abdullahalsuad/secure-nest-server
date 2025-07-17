import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
    },
    // firebase id
    userId: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enum: ["Customer", "Agent", "Admin"],
      default: "Customer",
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    // agent
    experience: {
      type: String,
      default: "N/A",
    },

    specialties: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
