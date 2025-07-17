// config/stripe.js
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);

export default stripe;
