import express from "express";
import * as policeController from "../controllers/policeController.js";

import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// create new police
router.post("/add-police", verifyAdmin, policeController.addPolice);

// get all polices
router.get("/polices", policeController.getAllPolices);

// get all polices
router.get("/polices/:id", policeController.getAPolice);

// DELETE /policies/:id
router.delete("/policies/:id", verifyAdmin, policeController.removePolices);

// update a policy
router.patch("/policies/:id", verifyAdmin, policeController.updatePolicy);

export default router;
