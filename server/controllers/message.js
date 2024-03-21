const ApiError = require("../error/handler");
const checkValidateRequest = require("../utils/checkValidateRequest");
const MessageService = require("../services/message.js");

class MessageController {
  async getAll(req, res, next) {
    try {
      checkValidateRequest(req);

      const messages = await MessageService.getAll(req.body);

      if (!messages) {
        throw new ApiError().BadRequest(
          "При получении сообщених произошла ошибка"
        );
      }

      return res.status(200).json({
        message: "Сообщение успешно получены",
        messages,
      });
    } catch (err) {
      next(err);
    }
  }

  async save(req, res, next) {
    try {
      checkValidateRequest(req);

      const message = await MessageService.save(req.body);

      if (!message) {
        throw new ApiError().BadRequest(
          "При сохранении сообщение произошла ошибка"
        );
      }

      return res.status(200).json({
        message: "Сообщение успешно сохранено",
        value: message,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MessageController();
