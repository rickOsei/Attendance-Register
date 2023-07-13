const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const UserModel = require("../models/user_model");
const StatusCodes = require("http-status-codes");

const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email | !Password) {
    throw new BadRequestError("Please enter email and password");
  }
  const user = await UserModel.findOne({ Email });
  if (!user) {
    throw new UnauthorizedError("Not authorised to login");
  }
  const compareResult = await user.comparePassword(Password);
  if (!compareResult) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.default.OK).json({ user: { name: user.Name }, token });
};

module.exports = loginUser;
