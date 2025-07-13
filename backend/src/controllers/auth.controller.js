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

    const existingOne = await userModel.findOne({ email });

    if (existingOne) {
      // return res
      //   .status(400)
      //   .json({ Message: "User already Exists with this email" });
      throw new Error("User already exists");
    }

    const newUser = new userModel({
      fullName,
      email,
      password,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        // profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
      return res.status(400).send(new Error("Invalid  Password"));
    }

    const token = generateToken(existingOne?._id, res);
    res.status(201).json({
      message: "Login Successfull",
      // data : existingOne,
      _id: existingOne._id,
      email: existingOne.email,
      profilePic: existingOne.profile,
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
