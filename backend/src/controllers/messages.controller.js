import userModel from "../models/user.model.js";
import messageModel from "../models/messages.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllUsers = async (req, res) => {
  try {
    const LoggedInUser = req.user?._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: LoggedInUser } })
      .select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user?._id;
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, recieverId: userId },
        { recieverId: myId, senderId: userId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  const { text, image } = req.body;
  try {
    const { userId: recieverId } = req.params;
    const senderId = req.user?._id;
    let imageUrl;

    if (imageUrl) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await new messageModel({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
