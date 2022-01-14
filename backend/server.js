const express = require("express");
const connectDB = require("./models/db");
const cors = require("cors");
const User = require("./models/user");
const Job = require("./models/job");
const bcrypt = require("bcrypt");
const cors = require("cors");
const accountsSeed = require("./Seed/AccountsSeed");

const mongoUri = "mongodb://127.0.0.1:27017/hiremeplz";
connectDB(mongoUri);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// login
app.post("/login", async (req, res) => {
  const { username, hash } = req.body;
  console.log(username, hash);
  const user = await User.findOne({ username });
  console.log(user);
  const valid = await bcrypt.compare(hash, user.hash);
  if (valid) {
    res.json({ valid });
    return;
  }
  res.json({ valid });
});

// myjobs
app.get("/myjobs/:userid", async (req, res) => {
  const jobs = await Job.find({ employerid: req.params.userid });
  res.json(jobs);
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

//profile
app.get("/profile/:userid", async (req, res) => {
  // await User.deleteMany();
  // await User.create(accountsSeed);
  const profileOfUserId = await User.find({ _id: req.params.userid });
  res.json(profileOfUserId);
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
