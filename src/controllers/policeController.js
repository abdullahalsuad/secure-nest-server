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

// get all polices with filtering, search, and pagination
export const getAllPolices = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;

    // Build query object
    let query = {};

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search filter (case-insensitive regex)
    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const polices = await PoliceModel.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalPolicies = await PoliceModel.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(totalPolicies / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      data: polices,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPolicies,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching policies",
      error: error.message,
    });
  }
};

// Get all available categories
export const getPolicyCategories = async (req, res) => {
  try {
    const categories = await PoliceModel.distinct("category");
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
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
