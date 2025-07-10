import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// create JWT cookie
router.post("/jwt", userController.createJwtToken);

//  clearing JWT cookie
router.post("/logout", userController.logout);

// add a user
router.post("/add-user", userController.addUser);

// add a user
router.patch("/update-profile/:userId", userController.updateProfile);

// get all user
router.get("/users", verifyToken, userController.getAllUsers);

export default router;
