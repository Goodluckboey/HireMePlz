const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  reward: Number,
  status: String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
