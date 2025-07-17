import stripe from "../config/stripe.js";
import PaymentModel from "../models/paymentModel.js";
import ApplicationModel from "../models/applicationModel.js";

export const createPaymentIntent = async (req, res) => {
  const { amountInCents } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new payment
export const addPayment = async (req, res) => {
  try {
    const { applicationId } = req.body;
    console.log(applicationId);

    const newPayment = new PaymentModel(req.body);
    await newPayment.save();

    await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      { $set: { paymentStatues: "Paid" } },
      { new: true }
    );

    res.status(200).json({
      message: "Payment updated/saved and parcel status changed to paid",
    });
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// get all payment history for admin
export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find().sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all payment history for user
export const getPaymentsHistoryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await PaymentModel.find({ userID: userId });

    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};
