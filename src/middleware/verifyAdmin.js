import UserModel from "../models/userModel.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.user.email;

    const user = await UserModel.findOne({ userEmail: email });

    // todo : not proper way need to fix
    if (!user || user.userRole !== "Admin") {
      return res.status(403).json({ message: "forbidden access" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyAdmin;
