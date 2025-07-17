import express from "express";
import * as policeController from "../controllers/policeController.js";

import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// create new police
router.post("/add-police", verifyAdmin, policeController.addPolice);

// get all polices
router.get("/polices", policeController.getAllPolices);

// get policy categories
router.get("/policies/categories", policeController.getPolicyCategories);

// get a police
router.get("/polices/:id", policeController.getAPolice);

// DELETE a police
router.delete("/policies/:id", verifyAdmin, policeController.removePolices);

// update a policy
router.patch("/policies/:id", verifyAdmin, policeController.updatePolicy);

export default router;
