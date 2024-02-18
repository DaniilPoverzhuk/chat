const ApiError = require("../error/errorHandler.js");
const ErrorService = require("../services/error.js");
const MessageService = require("../services/message.js");

class MessageController {
  async send(req, res, next) {
    try {
      ErrorService.checkError(req);

      const message = await MessageService.save(req.body);

      if (!message) {
        throw new ApiError().BadRequest("При отправке сообщения произошла ошибка :(");
      }

      res.status(200).json({
        message: "Message has been sent successfully",
        value: message,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MessageController();
