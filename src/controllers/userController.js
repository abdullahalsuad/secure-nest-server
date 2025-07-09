import UserModel from "../models/userModel.js";

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
