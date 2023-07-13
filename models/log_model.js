const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  logType: {
    type: String,
    enum: ["logged-in", "logged-out"],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const LogModel = mongoose.model("Log", LogSchema);
module.exports = LogModel;
