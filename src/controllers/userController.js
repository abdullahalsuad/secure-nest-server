import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// create JWT cookie
export const createJwtToken = (req, res) => {
  const userInfo = req.body;

  const token = generateToken(userInfo);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to true in production
  });

  res.json({ success: true });
};

//  clearing JWT cookie
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true in production
  });

  res.json({ message: "Logged out successfully" });
};

// add new user
export const addUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);

    const { userId } = req.body;
    const existingUser = await UserModel.findOne({ userId });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json({ messages: err.message });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { userName, userProfile } = req.body;

    // Build update object with only allowed fields
    const updateFields = {};
    if (userName) updateFields.userName = userName;
    if (userProfile) updateFields.userProfile = userProfile;

    // Find and update user
    const updatedUser = await UserModel.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ userId });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
