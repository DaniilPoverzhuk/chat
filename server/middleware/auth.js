const ApiError = require("../error/handler.js");
const { isValidAccessToken } = require("../services/token.js");

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw new ApiError().Unauthorized();
  }

  if (!isValidAccessToken(accessToken)) {
    throw new ApiError().Unauthorized();
  }

  next();
};
