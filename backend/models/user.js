const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    username: { type: String, unique: true, required: true },
    hash: String,
  },
  { timestamps: true },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
