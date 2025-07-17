import express from "express";
import * as paymentController from "../controllers/paymentController.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-payment-intent", paymentController.createPaymentIntent);

router.post("/payments", paymentController.addPayment);

router.get(
  "/payments-history/:userId",
  paymentController.getPaymentsHistoryByUserId
);

//get all payment history  admin only
router.get("/all-payments", paymentController.getAllPayments);

export default router;
