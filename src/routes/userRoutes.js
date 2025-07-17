import express from "express";
import * as userController from "../controllers/userController.js";

import verifyAdmin from "../middleware/verifyAdmin.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// create JWT cookie
router.post("/jwt", userController.createJwtToken);

//  clearing JWT cookie
router.post("/logout", userController.logout);

// add a user
router.post("/add-user", userController.addUser);

// update profile
router.patch(
  "/update-profile/:userId",
  verifyToken,
  userController.updateProfile
);

// update agent profile
router.patch(
  "/update-agent-profile/:userId",
  verifyToken,
  userController.updateAgentProfile
);

// check the user role
router.get("/user/:userId", userController.getUserById);

// for admin only

// get all agents
router.get("/agents", userController.getAllAgents);

// get all user
router.get("/users", verifyToken, verifyAdmin, userController.getAllUsers);

// role update
router.patch(
  "/role/:userId",
  verifyToken,
  verifyAdmin,
  userController.userRoleChange
);

export default router;
