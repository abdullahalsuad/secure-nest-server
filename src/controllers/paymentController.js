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

// 
export const getIncomeStats = async (req, res) => {
  try {
    const now = new Date();

    // Define time boundaries
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Helper function to get total income from a date
    const getIncomeSince = async (startDate) => {
      const result = await PaymentModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }, // Using correct field
          },
        },
      ]);
      return result[0]?.total || 0;
    };

    // Total income (all time)
    const totalResult = await PaymentModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const totalIncome = totalResult[0]?.total || 0;

    // Get other period incomes
    const [dailyIncome, weeklyIncome, monthlyIncome, yearlyIncome] =
      await Promise.all([
        getIncomeSince(startOfToday),
        getIncomeSince(startOfWeek),
        getIncomeSince(startOfMonth),
        getIncomeSince(startOfYear),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        dailyIncome,
        weeklyIncome,
        monthlyIncome,
        yearlyIncome,
      },
    });
  } catch (error) {
    console.error("Error fetching income stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch income statistics",
      error: error.message,
    });
  }
};

