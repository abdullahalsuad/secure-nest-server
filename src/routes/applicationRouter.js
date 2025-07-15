import express from "express";
import * as applicationController from "../controllers/applicationController.js";

import verifyAdmin from "../middleware/verifyAdmin.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// create a application
router.post("/application", verifyToken, applicationController.addApplication);

// assign agent
router.patch(
  "/applications/assign-agent/:applicationId",
  verifyToken,
  verifyAdmin,
  applicationController.assignAgent
);

// get all application
router.get(
  "/applications",
  verifyToken,
  applicationController.getAllApplication
);

// get all user's application
router.get(
  "/my-applications/:userId",
  verifyToken,
  applicationController.getUserApplications
);

// update statues
router.patch(
  "/applications/:applicationId",
  verifyToken,
  applicationController.changeStatues
);

// Get all assigned applications  for agents
router.get(
  "/assigned-applications/:userId",
  verifyToken,
  applicationController.getAssignedApplications
);

// Get single application
router.get(
  "/single-application/:applicationId",
  applicationController.getSingleApplication
);

export default router;
