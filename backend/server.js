const express = require("express");
const connectDB = require("./models/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Job = require("./models/job");
const accountsSeed = require("./Seed/AccountsSeed");
const jobsSeed = require("./Seed/JobsSeed");
const sanitize = require("mongo-sanitize");
const chatController = require("./controllers/ChatController");

const mongoUri = "mongodb://127.0.0.1:27017/hiremeplz";
connectDB(mongoUri);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/chats", chatController);

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

// search for a job allows optional tags and query
app.post("/searchjobs?", async (req, res) => {
  const { query, tags } = sanitize(req.body);
  const { type } = sanitize(req.query); // ?type=and
  let jobs;
  try {
    const regex = new RegExp(query, "gi");
    if (tags.length === 0) {
      jobs = await Job.find({ $or: [{ name: regex }, { description: regex }] });
    } else {
      if (type === "or") {
        jobs = await Job.find({
          $or: [{ name: regex }, { description: regex }],
          tags: { $all: tags },
        });
      } else if (type === "and") {
        jobs = await Job.find({
          $or: [{ name: regex }, { description: regex }],
          tags,
        });
      }
    }
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

// find user by username, then compare hash to authenticate
app.post("/login", async (req, res) => {
  const { username, hash } = sanitize(req.body);
  let valid = false;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ valid });
      return;
    }
    valid = await bcrypt.compare(hash, user.hash);
    if (valid) {
      res.json({ valid, user });
    } else {
      res.json({ valid, msg: "wrong password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ valid, msg: "authentication failed due to err: " + err });
  }
});

// find jobs by employer id
app.get("/myjobs/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({
      employerid: req.params.userid,
      status: { $in: ["Accepted", "Pending", "Open"] },
    });
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
      { $set: { employeeid: userId, status: "Pending" } }
    );
    res.json(job);
  } catch (err) {
    res.json(err);
  }
});

//cancel apply jobs by changing the status
//technically the same as reject job
app.put("/appliedjob/cancel/:jobid", async (req, res) => {
  try {
    const appliedJob = await Job.findOneAndUpdate(
      { _id: req.params.jobid },
      { $set: { status: "Open", employeeid: "" } }
    );
    res.json(appliedJob);
  } catch (err) {
    res.json(err);
  }
});

//display applied jobs via employee id
app.get("/appliedjobs/:userid", async (req, res) => {
  try {
    const jobs = await Job.find({
      employeeid: req.params.userid,
      status: { $in: ["Accepted", "Pending"] },
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

//accept a job by jobid
app.put("/individualjob/accept/:jobid", async (req, res) => {
  const jobid = sanitize(req.params.jobid);
  try {
    const updateStatus = await Job.findOneAndUpdate(
      { _id: jobid },
      { $set: { status: "Accepted" } }
    );
    res.json(updateStatus);
  } catch (err) {
    res.json(err);
  }
});

//reject a job by jobid
app.put("/individualjob/reject/:jobid", async (req, res) => {
  const jobid = sanitize(req.params.jobid);
  try {
    const updateStatus = await Job.findOneAndUpdate(
      { _id: jobid },
      { $set: { status: "Open", employeeid: "" } }
    );
    res.json(updateStatus);
  } catch (err) {
    res.json(err);
  }
});

//complete a job by jobid
app.put("/individualjob/completed/:jobid", async (req, res) => {
  const jobid = sanitize(req.params.jobid);
  try {
    const updateStatus = await Job.findOneAndUpdate(
      { _id: jobid },
      { $set: { status: "Completed" } }
    );
    res.json(updateStatus);
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

// search employee by name w/ optional tags and query
app.post("/searchemployee?", async (req, res) => {
  const { query, tags } = sanitize(req.body);
  const { type } = sanitize(req.query);
  let employees;
  try {
    const regex = new RegExp(query, "gi");
    if (tags.length === 0) {
      employees = await User.find({
        $or: [{ username: regex }, { firstname: regex }, { lastname: regex }],
      });
    } else {
      if (type === "and") {
        employees = await User.find({
          $or: [{ username: regex }, { firstname: regex }, { lastname: regex }],
          tags,
        });
      } else if (type === "or") {
        employees = await User.find({
          $or: [{ username: regex }, { firstname: regex }, { lastname: regex }],
          tags: { $all: tags },
        });
      }
    }
    res.json(employees);
  } catch (err) {
    res.json(err);
  }
});

app.post("/doesusernameexist", async (req, res) => {
  const { username } = sanitize(req.body);
  const users = await User.find({ username });
  if (users.length !== 0) {
    res.json({ data: true, msg: "username exists" });
  } else {
    res.json({ data: false, msg: "username does not exist" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
