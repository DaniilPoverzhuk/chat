const TokenService = require("../services/token.js");
const ApiError = require("../error/errorHandler.js");

class TokenController {
  async update(req, res, next) {
    try {
      const refreshToken = TokenService.getRefreshTokenFromCookie(req);

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

  async check(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      if (!accessToken) {
        throw new ApiError().UnauthorizedError();
      }

      const isValidAccessToken = TokenService.isValidAccessToken(accessToken);

      if (!isValidAccessToken) {
        const refreshToken = TokenService.getRefreshTokenFromCookie(req);

        if (!refreshToken) {
          throw new ApiError().UnauthorizedError();
        }

        const isValidRefreshToken = TokenService.isValidRefreshToken(refreshToken);

        if (!isValidRefreshToken) {
          throw new ApiError().UnauthorizedError();
        }

        const { exp, iat, ...user } = isValidRefreshToken;
        const tokens = await TokenService.generateTokens(user);

        await TokenService.saveToken(user.id, tokens);

        return res.status(200).json({
          message: "Tokens have been updated",
          user: { ...user, ...tokens },
        });
      }

      const refreshToken = TokenService.getRefreshTokenFromCookie(req);
      const user = { ...isValidAccessToken, accessToken, refreshToken };

      return res.status(200).json({
        message: "Token is valid",
        user,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TokenController();
