const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const UserModel = require("../models/user_model");
const StatusCodes = require("http-status-codes");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    throw new BadRequestError("Please enter email and password");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnauthorizedError("Not authorised to login");
  }
  const compareResult = await user.comparePassword(password);
  if (!compareResult) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.default.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};

module.exports = loginUser;
