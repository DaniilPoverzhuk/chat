const ErrorService = require("../services/error.js");
const Models = require("../models/index.js");
const { Op } = require("sequelize");

class UserController {
  async getAll(req, res, next) {
    try {
      ErrorService.checkError(req);

      const user = req.body;

      const users = await Models.User.findAll({
        where: {
          email: {
            [Op.not]: user.email,
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
