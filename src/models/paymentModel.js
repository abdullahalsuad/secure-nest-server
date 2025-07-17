import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },

    applicationId: {
      type: String,
      required: true,
    },

    // User Info
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },

    // Payment Details
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;
