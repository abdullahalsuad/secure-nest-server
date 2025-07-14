import ApplicationModel from "../models/applicationModel.js";

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
    console.log(Status);
    console.log(applicationId);

    if (!["Pending", "Approved", "Rejected"].includes(Status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const applications = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      { $set: { Status } },
      { new: true }
    );

    res.status(200).json(applications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
