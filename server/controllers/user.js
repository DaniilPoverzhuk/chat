const ApiError = require("../error/handler");
const UserService = require("../services/user.js");
const checkValidateRequest = require("../utils/checkValidateRequest.js");

class UserController {
  async get(req, res, next) {
    try {
      const { email } = req.body;
      const { limit } = req.query;

      const users = await UserService.get(email, +limit);

      if (!users) {
        throw new ApiError().BadRequest(
          "При получении пользователей произошла ошибка"
        );
      }

      res.status(200).json({
        message: "Пользователи успешно получены",
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getById(id);

      if (!user) {
        throw new ApiError().BadRequest(
          "При получении пользователя произошла ошибка :("
        );
      }

      return res.status(200).json({
        message: "Пользователь успешно получен",
        user,
      });
    } catch (err) {
      err;
      next(err);
    }
  }

  async getNonFriends(req, res, next) {
    try {
      checkValidateRequest(req);

      const users = await UserService.getNonFriends(req.body);

      if (!users) {
        throw new ApiError().BadRequest(
          "При получении пользователей произошла ошибка"
        );
      }

      return res
        .status(200)
        .json({ message: "Пользователи успешно получены", users });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
