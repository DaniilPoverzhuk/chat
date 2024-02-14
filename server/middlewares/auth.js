const ApiError = require("../error/errorHandler.js");
const TokenService = require("../services/token.js");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    console.log(accessToken, "accessToken");

    if (!accessToken) {
      throw new ApiError().UnauthorizedError();
    }

    const user = TokenService.isValidAccessToken(accessToken);

    if (!user) {
      throw new ApiError().UnauthorizedError();
    }

    req.body = user;

    next();
  } catch (err) {
    next(err);
  }
};
