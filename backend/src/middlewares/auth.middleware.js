import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await userModel.findById(decoded?.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
