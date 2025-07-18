import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
      subject: userId.toString(),
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};
