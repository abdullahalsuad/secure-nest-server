import express from "express";
import * as newsletterController from "../controllers/newsletterController.js";

const router = express.Router();

// Subscribe to newsletter
router.post("/subscribe", newsletterController.subscribeToNewsletter);

export default router;
