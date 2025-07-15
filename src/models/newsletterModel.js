import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const NewsletterModel = mongoose.model("Newsletter", newsletterSchema);
export default NewsletterModel;
