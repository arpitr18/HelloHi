import { generateToken } from "../../utils/jwt.js";
import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        Message: "All fields are required!",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        Message: "User already exists with this email",
      });
    }

    const newUser = new userModel({
      fullName,
      email,
      password,
    });

    await newUser.save();
    const token = generateToken(newUser._id, res);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token,
    });
  } catch (err) {
    const errorMessage = err.message || "An error occurred";

    console.log("Error in signup controller:", errorMessage);

    res.status(500).json({
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        Message: "All fields are required!",
      });
    }
    const existingOne = await userModel.findOne({ email });

    if (!existingOne) {
      return res.status(401).json({ Message: "User doesn't Exists" });
    }

    if (!(await existingOne.comparePassword(password))) {
      return res.status(400).json({ Message: "Invalid Credentials" });
    }

    const token = generateToken(existingOne?._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(201).json({
      message: "Login Successfull",
      data: existingOne,
      token,
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    console.log("Logout error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const userId = req.user?._id;
    if (!profile) {
      res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profile);
    const updatedUse = await userModel.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUse);
  } catch (error) {
    console.log("Update Profile error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
