const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  EmployeeNumber: {
    type: String,
  },
  Name: {
    type: String,
    required: [true, "Please provide name"],
  },
  Department: {
    type: String,
    required: [true, "Please provide department"],
  },
  Position: {
    type: String,
    required: [true, "Please provide position"],
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
