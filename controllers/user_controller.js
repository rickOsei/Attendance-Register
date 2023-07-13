const UserModel = require("../models/user_model");
const StatusCodes = require("http-status-codes");

const createUser = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.default.CREATED).json({ success: true, user, token });
};

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.status(StatusCodes.default.OK).json({ success: true, data: users });
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await UserModel.findByIdAndDelete({ _id: userID });
  res.status(StatusCodes.default.OK).json({ success: true, data: user });
};

const editUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await UserModel.findByIdAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.default.OK).json({ success: true, data: user });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  editUser,
  loginUser,
};
