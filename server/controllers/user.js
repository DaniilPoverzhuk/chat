const ErrorService = require("../services/error.js");
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
}

module.exports = new UserController();
