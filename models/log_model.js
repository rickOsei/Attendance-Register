const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  Date: {
    type: String,
    required: true,
  },
  LogType: {
    type: String,
    enum: ["log-in", "log-out"],
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  EmployeeNumber: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
});

const LogModel = mongoose.model("Log", LogSchema);
module.exports = LogModel;
