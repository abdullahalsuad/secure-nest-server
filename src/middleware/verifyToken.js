import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  console.log(token);

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden access" });

    req.decoded = decoded;
    next();
  });
};
