const TokenService = require("../services/token.js");
const ApiError = require("../error/errorHandler.js");

class TokenController {
  async updateToken(req, res, next) {
    try {
      const refreshToken = req.headers.cookie.split("=")[1];

      const { exp, iat, ...user } = TokenService.isValidRefreshToken(refreshToken);

      if (!user) {
        throw new ApiError().UnauthorizedError();
      }

      const tokens = await TokenService.generateTokens(user);

      await TokenService.saveToken(user.id, tokens);

      res.cookie("refreshToken", tokens.refreshToken);

      return res.status(200).json({
        message: "Token has been successfully updated",
        user: {
          ...user,
          ...tokens,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TokenController();
