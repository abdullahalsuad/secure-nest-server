import express from "express";
import * as claimController from "../controllers/claimController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// Customer routes
router.post("/claims", verifyToken, claimController.submitClaim);

// for admin
router.get("/claims", verifyToken, claimController.getAllClaimsForAdmin);

// Agent routes
router.get(
  "/claims/:assignedAgentId",
  verifyToken,
  claimController.getAllClaims
);

router.patch("/claims/:claimId", verifyToken, claimController.approveClaim);

export default router;
