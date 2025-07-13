import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = model("message", messageSchema);
export default messageModel;
