const LogModel = require("../models/log_model");
const EmployeeModel = require("../models/employee_model");
const StatusCodes = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const createLog = async (req, res) => {
  const { EmployeeNumber: LoggedNumber } = req.body;
  const employee = await EmployeeModel.findOne({
    EmployeeNumber: LoggedNumber,
  });
  if (!employee) {
    throw UnauthenticatedError("No employee with this number");
  }
  const { Name } = employee;
  const tempLog = { ...req.body, Name };
  const log = await LogModel.create(tempLog);
  res.status(StatusCodes.default.CREATED).json({ success: true, log });
};

const getAllLogs = async (req, res) => {
  const logs = await LogModel.find({});
  res.status(StatusCodes.default.OK).json({ success: true, data: logs });
};

const deleteLog = async (req, res) => {
  const { id: logID } = req.params;
  const log = await LogModel.findByIdAndDelete({ _id: logID });
  res.status(StatusCodes.default.OK).json({ success: true, data: log });
};

module.exports = { createLog, getAllLogs, deleteLog };
