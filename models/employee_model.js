const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  department: {
    type: String,
    required: [true, "Please provide department"],
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
