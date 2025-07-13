import PoliceModel from "../models/policeModel.js";

// create new police
export const addPolice = async (req, res) => {
  try {
    const police = new PoliceModel(req.body);

    const savedPolice = await police.save();

    res.status(201).json({
      message: "Police created successfully",
      police: savedPolice,
    });
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// get all polices
export const getAllPolices = async (req, res) => {
  try {
    const polices = await PoliceModel.find();

    res.status(200).json(polices);
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// Get single police
export const getAPolice = async (req, res) => {
  try {
    const { id } = req.params;

    const police = await PoliceModel.findById(id);

    if (!police) {
      return res.status(404).json({ message: "Police record not found" });
    }

    res.status(200).json(police);
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// delete  a polices
export const removePolices = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPolice = await PoliceModel.findByIdAndDelete(id);

    if (!deletedPolice) {
      return res.status(404).json({ message: "Police not found" });
    }

    res.status(200).json(deletedPolice);
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// UPDATE a policy
export const updatePolicy = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const updatedData = req.body;

  try {
    const updatedPolicy = await PoliceModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json(updatedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
