const LogModel = require("../models/log_model");
const EmployeeModel = require("../models/employee_model");
const StatusCodes = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const createEmployeeLogIn = async (req, res) => {
  const { employeeNumber, date } = req.body;

  // Ensuring employee number exists in our database
  const employee = await EmployeeModel.findOne({
    employeeNumber,
  });

  if (!employee) {
    throw new UnauthenticatedError(
      `There is no employee associated with this number |${employeeNumber}|`
    );
  }

  // Preventing employees from logging more than once in a day
  const { name } = employee;
  const alreadyLoggedIn = await LogModel.findOne({
    employeeNumber,
    date,
    logType: "logged-in",
  });
  if (alreadyLoggedIn) {
    throw new BadRequestError(
      `The employee with number |${employeeNumber}| has already logged in today`
    );
  }
  const tempLog = { ...req.body, name, logType: "logged-in" };
  const log = await LogModel.create(tempLog);
  res.status(StatusCodes.default.CREATED).json({ success: true, log });
};

const createEmployeeLogOut = async (req, res) => {
  const { employeeNumber, date } = req.body;

  // Ensuring employee number exists in our database
  const employee = await EmployeeModel.findOne({
    employeeNumber,
  });
  if (!employee) {
    throw new UnauthenticatedError(
      `There is no employee associated with this number |${employeeNumber}|`
    );
  }

  // Preventing employees from logging out without logging in and also logging out more than once
  const { name } = employee;
  const currentLog = await LogModel.findOne({
    employeeNumber,
    date,
    logType: "logged-in",
  });
  const alreadyLoggedOut = await LogModel.findOne({
    employeeNumber,
    date,
    logType: "logged-out",
  });
  if (!currentLog) {
    throw new BadRequestError(
      "Kindly ensure you log in for the day before logging out"
    );
  } else if (alreadyLoggedOut) {
    throw new BadRequestError(
      `The employee with number |${employeeNumber}| has already logged out today`
    );
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
