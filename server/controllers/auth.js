const ErrorService = require("../services/error.js");
const AuthService = require("../services/auth.js");
const TokenService = require("../services/token.js");
const userDto = require("../dto/user.js");
const Models = require("../models/index.js");
const ApiError = require("../error/errorHandler.js");

class AuthController {
  async getMe(req, res, next) {
    try {
      ErrorService.checkError(req);

      const { email } = req.body;
      const user = await Models.User.findOne({ where: { email } });

      if (!user) {
        throw new ApiError().UnauthorizedError();
      }

      return res.status(200).json({
        message: "User was successfully received",
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      ErrorService.checkError(req);

      const user = userDto(await AuthService.login(req.body));
      const tokens = await TokenService.generateTokens(user);

      await TokenService.saveToken(user.id, tokens);

      res.cookie("refreshToken", tokens.refreshToken);

      return res.status(200).json({
        message: "Successful authentication",
        user: { ...user, ...tokens },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async registration(req, res, next) {
    try {
      ErrorService.checkError(req);

      const user = userDto(await AuthService.registration(req.body));
      const tokens = await TokenService.generateTokens(user);

      await TokenService.saveToken(user.id, tokens);

      res.cookie("refreshToken", tokens.refreshToken);

      return res.status(200).json({
        message: "Successful registration",
        user: { ...user, ...tokens },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
