const express = require("express");
const connectDB = require("./models/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Job = require("./models/job");
const accountsSeed = require("./Seed/AccountsSeed");
const jobsSeed = require("./Seed/JobsSeed");
const sanitize = require("mongo-sanitize");

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
    const jobs = await Job.find({ status: "Open" });
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

// search for a job
app.post("/searchjobs", async (req, res) => {
  const { query } = sanitize(req.body);
  try {
    const regex = new RegExp(query, "gi");
    const jobs = await Job.find({ name: regex });
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

// find user by username, then compare hash to authenticate. then send back user data if valid, else send back false
app.post("/login", async (req, res) => {
  const { username, hash } = sanitize(req.body);
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
  const job = sanitize(req.body);
  try {
    const newJob = new Job(job);
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
  const { userId } = sanitize(req.body);
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobid },
      { $set: { employeeid: userId, status: "accepted" } }
    );
    res.json(job);
  } catch (err) {
    res.json(err);
  }
});

//display applied jobs via employee id
app.get("/appliedjobs/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({
      employeeid: req.params.userid,
      status: "accepted",
    });
    res.json(jobs);
  } catch (err) {
    res.json(err);
  }
});

// edit a job by job id
app.put("/individualjob/edit/:jobid", async (req, res) => {
  const body = sanitize(req.body);
  const jobid = sanitize(req.params.jobid);
  try {
    const job = await Job.findOneAndUpdate({ _id: jobid }, { ...body });
    res.json(job);
  } catch (err) {
    res.json(err);
  }
});

// delete a job by job id
app.delete("/individualjob/delete/:jobid", async (req, res) => {
  const jobid = sanitize(req.params.jobid);
  try {
    const deletedJob = await Job.findOneAndDelete({ _id: jobid });
    res.json(deletedJob);
  } catch (err) {
    res.json(err);
  }
});

// create a new user after hashing password
app.post("/registration", async (req, res) => {
  const { hash } = sanitize(req.body);
  try {
    const hashed = await bcrypt.hash(hash, 12);
    const user = new User({ ...req.body, hash: hashed });
    await user.save();
    res.json(user);
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

// find specific job data
app.get("/findjob/:jobid", async (req, res) => {
  try {
    const specificJob = await Job.find({ _id: req.params.jobid });
    res.json(specificJob);
  } catch (err) {
    res.json(err);
  }
});

// find all employees (which is all users for now)
app.get("/allemployees", async (req, res) => {
  try {
    const employees = await User.find({});
    res.json(employees);
  } catch (err) {
    res.json(err);
  }
});

// search employee by name
app.post("/searchemployee", async (req, res) => {
  const { query } = sanitize(req.body);
  try {
    const regex = new RegExp(query, "gi");
    const employees = await User.find({
      $or: [{ username: regex }, { firstname: regex }, { lastname: regex }],
    });
    res.json(employees);
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
