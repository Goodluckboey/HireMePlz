const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    reward: Number,
    status: {type: String, default: "Open"},
    employerid: String,
    employeeid: String,
  },
  { timestamps: true },
  { collection: "jobs" }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
