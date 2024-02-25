const ApiError = require("../error/errorHandler.js");
const ErrorService = require("../services/error.js");
const MessageService = require("../services/message.js");
const RoomService = require("../services/room.js");
const dto = require("../dto/index.js");

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

  async getLast(req, res, next) {
    try {
      ErrorService.checkError(req);

      const room = await RoomService.get(req.body);

      if (!room) {
        throw new ApiError().BadRequest("Ошибка при получении последнего сообщения");
      }

      const lastMessage = await MessageService.getLast(room.id);

      if (!lastMessage && typeof lastMessage !== "string") {
        throw new ApiError().BadRequest("Ошибка при получении последнего сообщения");
      }

      return res.status(200).json({
        message: "Last message was received successfully",
        value: lastMessage,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MessageController();
