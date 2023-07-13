const EmployeeModel = require("../models/employee_model");
const StatusCodes = require("http-status-codes");

const createEmployee = async (req, res) => {
  var randomNumber = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
  const temp_employee = {
    ...req.body,
    EmployeeNumber: `2023-${randomNumber}`,
  };
  const employee = await EmployeeModel.create(temp_employee);
  res
    .status(StatusCodes.default.CREATED)
    .json({ success: true, data: employee });
};

const getAllEmployees = async (req, res) => {
  const employees = await EmployeeModel.find({});
  res.status(StatusCodes.default.OK).json({ success: true, data: employees });
};

const deleteEmployee = async (req, res) => {
  const { id: employeeID } = req.params;
  const employee = await EmployeeModel.findByIdAndDelete({ _id: employeeID });
  res.status(StatusCodes.default.OK).json({ success: true, data: employee });
};

const editEmployee = async (req, res) => {
  const { id: employeeID } = req.params;
  const employee = await EmployeeModel.findByIdAndUpdate(
    { _id: employeeID },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.default.OK).json({ success: true, data: employee });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  editEmployee,
};
