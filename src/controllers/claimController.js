import ClaimModel from "../models/claimModel.js";
import ApplicationModel from "../models/applicationModel.js";

// Submit a new claim
export const submitClaim = async (req, res) => {
  try {
    const claim = new ClaimModel(req.body);

    await ApplicationModel.findByIdAndUpdate(
      { _id: claim.applicationId },
      { claimStatus: "Applied" },
      { new: true }
    );

    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all claims
export const getAllClaims = async (req, res) => {
  try {
    const assignedAgentId = req.params.assignedAgentId;


    const claims = await ClaimModel.find({ assignedAgentId }).sort({
      createdAt: -1,
    });

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve claim
export const approveClaim = async (req, res) => {
  try {
    const { claimId } = req.params;
    const { applicationId } = req.body;

    const claim = await ClaimModel.findByIdAndUpdate(
      { _id: claimId },
      { claimStatus: "Approved" },
      { new: true }
    );

    await ApplicationModel.findByIdAndUpdate(
      { _id: applicationId },
      { claimStatus: "Approved" },
      { new: true }
    );

    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
