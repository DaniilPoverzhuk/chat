const ErrorService = require("../services/error.js");
const UserService = require("../services/user.js");

const Models = require("../models/index.js");

const { Op } = require("sequelize");
const ApiError = require("../error/errorHandler.js");

class UserController {
  async getAll(req, res, next) {
    try {
      ErrorService.checkError(req);

      const { email } = req.body;

      const users = await Models.User.findAll({
        where: {
          email: {
            [Op.not]: email,
          },
        },
      });

      return res.status(200).json({
        message: "Users have been successfully received",
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllOnline(req, res, next) {
    try {
      ErrorService.checkError(req);

      const users = UserService.getAllOnline(req.body);

      if (!users) {
        throw new ApiError().BadRequest("При получени пользователей произошла ошибка :(");
      }

      return res.status(200).json({
        message: "Users have been successfully received",
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  async changeStatus(req, res, next) {
    try {
      ErrorService.checkError(req);

      const response = await UserService.changeStatus(req.body);

      if (!response) {
        throw new ApiError().BadRequest("При обновлении онлайн статуса произошла ошибка :(");
      }

      return res.status(200).json({
        message: "User's online status has been successfully updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
