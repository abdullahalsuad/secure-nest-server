import express from "express";
import * as applicationController from "../controllers/applicationController.js";

import verifyAdmin from "../middleware/verifyAdmin.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// create a application
router.post("/application", verifyToken, applicationController.addApplication);

// get all application
router.get(
  "/applications",
  verifyToken,
  verifyAdmin,
  applicationController.getAllApplication
);

// get all user application
router.get(
  "/my-applications/:userId",
  verifyToken,
  applicationController.getUserApplications
);

// update statues
router.patch(
  "/applications/:applicationId",
  verifyToken,
  verifyAdmin,
  applicationController.changeStatues
);

export default router;
