const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, required: true },
    status: { type: String, default: "Open" },
    employerid: { type: String, required: true },
    employeeid: String,
    tags: [String],
  },
  { timestamps: true },
  { collection: "jobs" }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
