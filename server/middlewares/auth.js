const ApiError = require("../error/errorHandler.js");
const TokenService = require("../services/token.js");

module.exports = (req, _, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new ApiError().UnauthorizedError();
    }

    const user = TokenService.isValidAccessToken(accessToken);

    if (!user) {
      throw new ApiError().UnauthorizedError();
    }

    next();
  } catch (err) {
    next(err);
  }
};
