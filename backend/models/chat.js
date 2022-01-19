const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    employeeid: { type: String, required: true },
    employerid: { type: String, required: true },
    jobid: { type: String, required: true, unique: true },
    messages: [{ user: String, message: String }],
  },
  { collection: "Chats" }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
