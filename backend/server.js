const express = require("express");
const connectDB = require("./models/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Job = require("./models/job");
const accountsSeed = require("./Seed/AccountsSeed");
const jobsSeed = require("./Seed/JobsSeed");

const mongoUri = "mongodb://127.0.0.1:27017/hiremeplz";
connectDB(mongoUri);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// seed data
app.get("/seeddata", async (req, res) => {
  await Job.deleteMany({});
  await User.deleteMany({});
  for (const user of accountsSeed) {
    const { hash } = user;
    const hashed = await bcrypt.hash(hash, 12);
    const createdUser = await User.create({ ...user, hash: hashed });
    for (const job of jobsSeed) {
      await Job.create({ ...job, employerid: createdUser.id });
    }
  }
  const users = await User.find({});
  const jobs = await Job.find({});
  res.send(users + jobs);
});

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
  const { query } = req.body;
  try {
    const jobs = await Job.find({ name: query });
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

// find user by username, then compare hash to authenticate. then send back user data if valid, else send back false
app.post("/login", async (req, res) => {
  const { username, hash } = req.body;
  let valid = false;
  try {
    const user = await User.findOne({ username });
    valid = await bcrypt.compare(hash, user.hash);
    if (valid) {
      res.json(user);
    } else {
      res.json("authentication failed");
    }
  } catch (err) {
    console.log(err);
    res.json(`authentication failed ${err}`);
  }
});

// find jobs by employer id
app.get("/myjobs/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({ employerid: req.params.userid });
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

// add a new job
app.post("/postjobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.json(err);
  }
});

// get jobs by employer id
app.get("/individualjob/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({ employerid: req.params.userid });
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

//apply jobs by attaching user id to employee id
app.put("/applyjob/:jobid", async (req, res) => {
  const { userId } = req.body;
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobid },
      { $set: { employeeid: userId } }
    );
    res.json(job);
  } catch (err) {
    res.json(err);
  }
});

// edit a job by job id
app.put("/individualjob/edit/:jobid", async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobid },
      { ...req.body }
    );
    res.json(job);
  } catch (err) {
    res.json(err);
  }
});

// delete a job by job id
app.delete("/individualjob/delete/:jobid", async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({ _id: req.params.jobid });
    res.json(deletedJob);
  } catch (err) {
    res.json(err);
  }
});

// create a new user after hashing password
app.post("/registration", async (req, res) => {
  const { hash } = req.body;
  try {
    const hashed = await bcrypt.hash(hash, 12);
    await User.create({ ...req.body, hash: hashed });
    res.json(req.body);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// find a user then send back everything except the userid and hash
app.get("/profile/:userid", async (req, res) => {
  try {
    const profileOfUserId = await User.find(
      { _id: req.params.userid },
      { _id: 0, hash: 0 }
    );
    res.json(profileOfUserId);
  } catch (err) {
    res.json(err);
  }
});

//get single profile id from login page( STILL WORKING ON THIS)
// app.get("/profile/singleId", async (req, res) => {
//   const singleUserId = await User.find({}, { id: 1 });
//   res.json(singleUserId);
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
