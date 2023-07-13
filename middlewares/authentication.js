const CustomError = require("../errors");
const { isTokenValid, attachCookiesToResponse } = require("../utils");
const Token = require("../models/Token");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  if (authHeader?.startsWith("Bearer")) {
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    try {
      const { userId } = isTokenValid(token);
      req.user = await User.findOne({ _id: userId }).select("-password");
    } catch (error) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    next();
  }

  //   const { refreshToken, accessToken } = req.signedCookies;
  //   try {
  //     if (accessToken) {
  //       const payload = isTokenValid(accessToken);
  //       req.user = await User.findOne({ _id: payload.user.userId }).select(
  //         "-password"
  //       );
  //       return next();
  //     }
  //     const payload = isTokenValid(refreshToken);

  //     const existingToken = await Token.findOne({
  //       user: payload.user.userId,
  //       refreshToken: payload.refreshToken,
  //     });

  //     if (!existingToken || !existingToken?.isValid) {
  //       throw new CustomError.UnauthenticatedError("Authentication Invalid");
  //     }

  //     attachCookiesToResponse({
  //       res,
  //       user: payload.user,
  //       refreshToken: existingToken.refreshToken,
  //     });
  //     req.user = await User.findOne({ _id: payload.user.userId }).select(
  //       "-password"
  //     );
  //     next();
  //   } catch (error) {
  //     throw new CustomError.UnauthenticatedError("Authentication Invalid");
  //   }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
