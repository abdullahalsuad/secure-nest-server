import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const { email } = decoded;

    // const email = req.user.email;
    const user = await UserModel.findOne({ userEmail: email });

    if (!user || user.userRole !== "Admin") {
      return res.status(403).json({ message: "forbidden access" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyAdmin;
