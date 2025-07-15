import ApplicationModel from "../models/applicationModel.js";
import policeModel from "../models/policeModel.js";

// add new application
export const addApplication = async (req, res) => {
  try {
    const application = new ApplicationModel(req.body);

    const savedApplication = await application.save();

    res.status(201).json({
      message: "User created successfully",
      application: savedApplication,
    });
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// get all application
export const getAllApplication = async (req, res) => {
  try {
    const application = await ApplicationModel.find();

    res.status(200).json(application);
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// Get applications by logged-in user
export const getUserApplications = async (req, res) => {
  const userId = req.params.userId;
  try {
    const applications = await ApplicationModel.find({ userId });

    res.status(200).json(applications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// applications statues
export const changeStatues = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const { Status } = req.body;
    console.log(applicationId);

    if (!["Pending", "Approved", "Rejected"].includes(Status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const application = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      { $set: { Status } },
      { new: true }
    );

    // If status is Approved, increment
    if (Status === "Approved") {
      await policeModel.findByIdAndUpdate(
        application.policeId, // assumes
        { $inc: { purchaseCount: 1 } }
      );
    }

    res.status(200).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// assigned agent
export const assignAgent = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { agentEmail, agentName, agentID } = req.body;

    console.log(applicationId);

    const updatedApp = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      {
        $set: {
          "assignedAgent.agentEmail": agentEmail,
          "assignedAgent.agentName": agentName,
          "assignedAgent.agentID": agentID,
        },
      },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET assigned applications
export const getAssignedApplications = async (req, res) => {
  try {
    const agentID = req.params.userId;
    console.log(agentID);

    const applications = await ApplicationModel.find({
      "assignedAgent.agentID": agentID,
    });

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching assigned applications:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single application by ID
export const getSingleApplication = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    

    const application = await ApplicationModel.findById(applicationId);

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
