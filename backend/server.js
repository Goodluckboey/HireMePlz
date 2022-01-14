const express = require("express");
const connectDB = require("./models/db");
const cors = require("cors");
const User = require("./models/user");
const Job = require("./models/job");
const bcrypt = require("bcrypt");

const mongoUri = "mongodb://127.0.0.1:27017/hiremeplz";
connectDB(mongoUri);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// get all jobs
app.get("/alljobs", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

// search for a job
app.post("/searchjobs", async (req, res) => {
  const {}
  try {
    const jobs = await
  }
})

// login
app.post("/login", async (req, res) => {
  const { username, hash } = req.body;
  let valid = false;
  try {
    const user = await User.findOne({ username });
    valid = await bcrypt.compare(hash, user.hash);
  } catch (err) {
    console.log(err);
  }
  if (valid) {
    res.json({ valid });
  } else {
    res.json({ valid });
  }
});

// myjobs
app.get("/myjobs/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({ employerid: req.params.userid });
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

// postjobs
app.post("/postjobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.json(err);
  }
});

// individualjobs
app.get("/individualjob/:userid", async (req, res) => {
  const jobs = await Job.find({ employerid: req.params.userid });
  res.json(jobs);
});

app.put("/individualjob/edit/:jobid", async (req, res) => {
  await Job.findOneAndUpdate({ _id: req.params.jobid }, { ...req.body });
});

// registration
app.post("/registration", async (req, res) => {
  const { hash } = req.body;
  const hashed = await bcrypt.hash(hash, 12);
  await User.create({ ...req.body, hash: hashed });
  res.send(req.body);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
