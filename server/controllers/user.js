const ErrorService = require("../services/error.js");

const dto = require("../dto/index.js");

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

  async getAllFriends(req, res, next) {
    try {
      ErrorService.checkError(req);

      const { email } = req.body;
      const user = dto(await Models.User.findOne({ where: { email } }));

      if (!user) {
        throw new ApiError().BadRequest("Произошла ошибка при получении друзей");
      }

      return res.status(200).json({
        message: "Friends have been successfully received",
        friends: user.friends,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
