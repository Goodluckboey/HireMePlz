const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: String,
    email: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
