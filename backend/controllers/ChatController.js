const express = require("express");
const sanitize = require("mongo-sanitize");
const router = express.Router();
const Chat = require("../models/chat");

router.get("/allchats", async (req, res) => {
  const allChats = await Chat.find({});
  res.json(allChats);
});

router.post("/allmessages", async (req, res) => {
  const { jobid } = sanitize(req.body);
  try {
    const allMessages = await Chat.findOne({ jobid }, { messages: 1, _id: 0 });
    res.json(allMessages);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

router.post("/newchat", async (req, res) => {
  console.log(req.body);
  const { employeeid, employerid, jobid } = req.body;
  try {
    const newChat = new Chat({
      employeeid,
      employerid,
      jobid,
      messages: [],
    });
    await newChat.save();
    res.json(newChat);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

router.post("/newmessage", async (req, res) => {
  const { jobid, message } = sanitize(req.body);
  const chat = await Chat.findOneAndUpdate(
    { jobid },
    { $push: { messages : message } },
    { new: true }
  );
  res.json(chat);
});

module.exports = router;
