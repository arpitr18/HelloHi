import { generateToken } from "../../utils/jwt.js";
import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const newUser = new userModel({
      fullName,
      email,
      password,
    });

    await newUser.save();
    const token = generateToken(newUser._id, res);
  
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    const errormessage = err.message || "An error occurred";

    console.log("Error in signup controller:", err.message);

    res.status(500).json({
      message: "Signing up Error",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }
    const existingOne = await userModel.findOne({ email });

    if (!existingOne) {
      return res.status(401).json({ message: "User doesn't Exists" });
    }

    if (!(await existingOne.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(existingOne._id,res);
    
    res.status(201).json({
      message: "Login Successfull",
      data: existingOne,
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res
      .status(500)
      .json({ message: "Login Error", error: error.message });
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
      .json({ message: "Error Logging out", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile , fullName } = req.body;
    const userId = req.user?._id;
    

    let profileURL = '';
    if (profile) {
      const uploadResponse = await cloudinary.uploader.upload(profile);
      profileURL = uploadResponse.secure_url;
      // res.status(400).json({ message: "Profile pic is required" });
    }
    
    const updatedUse = await userModel.findByIdAndUpdate(
      userId,
      { profile: profileURL , fullName },
      { new: true }
    );
    res.status(200).json(updatedUse);
  } catch (error) {
    console.log("Update Profile error:", error.message);
    res
      .status(500)
      .json({ message: "Update Profile Error", error: error.message });
  }
};
