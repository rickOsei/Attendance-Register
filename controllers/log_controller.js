const LogModel = require("../models/log_model");
const EmployeeModel = require("../models/employee_model");
const StatusCodes = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const createEmployeeLogIn = async (req, res) => {
  const { employeeNumber: loggedNumber } = req.body;
  const employee = await EmployeeModel.findOne({
    employeeNumber: loggedNumber,
  });
  if (!employee) {
    throw new UnauthenticatedError("No employee with this number");
  }
  const { name } = employee;
  const tempLog = { ...req.body, name, logType: "logged-in" };
  const log = await LogModel.create(tempLog);
  res.status(StatusCodes.default.CREATED).json({ success: true, log });
};

const createEmployeeLogOut = async (req, res) => {
  const { employeeNumber: loggedNumber, date } = req.body;
  const employee = await EmployeeModel.findOne({
    employeeNumber: loggedNumber,
  });
  if (!employee) {
    throw new UnauthenticatedError("No employee with this number");
  }
  const { name } = employee;
  const currentLog = await LogModel.findOne({
    name,
    date,
    logType: "logged-in",
  });
  if (!currentLog) {
    throw new UnauthenticatedError("Please log in before you log out");
  }
  const tempLog = { ...req.body, name, logType: "logged-out" };
  const log = await LogModel.create(tempLog);
  res.status(StatusCodes.default.CREATED).json({ success: true, log });
};

const getAllLogs = async (req, res) => {
  const logs = await LogModel.find({});
  res.status(StatusCodes.default.OK).json({ success: true, data: logs });
};

const getAllLogsForToday = async (req, res) => {
  const { date: logDate } = req.params;

  const logs = await LogModel.find({ date: logDate });
  res.status(StatusCodes.default.OK).json({ success: true, data: logs });
};

const deleteLog = async (req, res) => {
  const { id: logID } = req.params;
  const log = await LogModel.findByIdAndDelete({ _id: logID });
  res.status(StatusCodes.default.OK).json({ success: true, data: log });
};

module.exports = {
  createEmployeeLogIn,
  createEmployeeLogOut,
  getAllLogs,
  getAllLogsForToday,
  deleteLog,
};
