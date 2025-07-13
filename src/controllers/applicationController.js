import ApplicationModel from "../models/applicationModel.js";

// add new user
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
