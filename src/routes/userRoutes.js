import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// add a user
router.post("/add-user", userController.addUser);

export default router;
