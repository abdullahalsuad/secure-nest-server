import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/reviews", verifyToken, reviewController.submitReview);

export default router;
