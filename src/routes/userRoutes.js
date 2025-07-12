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

// add a user
router.patch(
  "/update-profile/:userId",
  verifyToken,
  userController.updateProfile
);

// check the user role
router.get("/user/:userId", verifyToken, userController.getUserById);

// for admin only
// get all user
router.get("/users", verifyToken, verifyAdmin, userController.getAllUsers);

//
router.patch(
  "/role/:userId",
  verifyToken,
  verifyAdmin,
  userController.userRoleChange
);

export default router;
