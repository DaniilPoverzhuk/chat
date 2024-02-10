const ErrorService = require("../services/error.js");
const AuthService = require("../services/auth.js");
const TokenService = require("../services/token.js");

class AuthController {
  async registration(req, res, next) {
    try {
      ErrorService.checkError(req);

      const user = AuthService.registration(req.body);
      const tokens = await TokenService.generateTokens(user);

      res.cookie("refreshToken", tokens.refreshToken);

      return res.status(200).json({
        user: { ...user, ...tokens },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
