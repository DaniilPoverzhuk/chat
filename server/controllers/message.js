const ApiError = require("../error/errorHandler.js");
const ErrorService = require("../services/error.js");
const MessageService = require("../services/message.js");

class MessageController {
  async save(req, res, next) {
    try {
      ErrorService.checkError(req);

      const message = await MessageService.save(req.body);

      if (!message) {
        throw new ApiError().BadRequest("При сохраении сообщения произошла ошибка :(");
      }

      res.status(200).json({
        message: "Message was saved successfully",
        value: message,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      ErrorService.checkError(req);

      const messages = await MessageService.getAll(req.body.roomId);

      if (!messages) {
        throw new ApiError().BadRequest("Произошла ошибка при получении всех сообщений");
      }

      return res.status(200).json({
        message: "Messages have been received successfully",
        messages,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MessageController();
