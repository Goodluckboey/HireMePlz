const express = require("express");
const connectDB = require("./models/db");
const jobController = require("./controllers/job");

const mongoUri = "mongodb://127.0.0.1:27017/hiremeplz";
connectDB(mongoUri);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/jobs", jobController)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
