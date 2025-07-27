import userModel from "../models/user.model.js";
import messageModel from "../models/messages.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReciversScoketId , io } from "../app.js";

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
    const { id : userId } = req.params;
    const myId = req.user?._id;
    const messages = await messageModel.find({
      $or: [
        { sender: myId, reciever: userId },
        { sender: userId, reciever: myId },
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
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;
    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      sender : senderId,
      reciever : recieverId,
      text,
      image: imageUrl,
    });
    
    await newMessage.save();

    const receiverSocketId = getReciversScoketId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ 
      ...newMessage._doc,
    });
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
