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
    const allMessages = await Chat.findOne({ jobid }, { _id: 0, messages: 1 });
    res.json(allMessages);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});
router.put("/newchat", async (req, res) => {
  const { employeeid, employerid, jobid } = sanitize(req.body);
  try {
    const allMessages = await Chat.findOne({ jobid });
    if (allMessages === null) {
      const newChat = new Chat({
        employeeid,
        employerid,
        jobid,
        messages: [],
      });
      await newChat.save();
      res.json(newChat);
    } else res.json(allMessages);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

// router.post("/newchat", async (req, res) => {
//   console.log(req.body);
//   const { employeeid, employerid, jobid } = req.body;
//   try {
//     const newChat = new Chat({
//       employeeid,
//       employerid,
//       jobid,
//       messages: [],
//     });
//     await newChat.save();
//     res.json(newChat);
//   } catch (err) {
//     console.log(err);
//     res.json({ status: "error", message: err.message });
//   }
// });

router.put("/newmessage", async (req, res) => {
  const { jobid, messages } = sanitize(req.body);
  const chat = await Chat.findOneAndUpdate(
    { jobid },
    { $push: { messages: messages } },
    { new: true }
  );
  res.json(chat);
});

module.exports = router;
