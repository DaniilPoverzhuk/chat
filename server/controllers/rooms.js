const ErrorService = require("../services/error.js");
const ChatService = require("../services/chat.js");

class RoomsController {
  async getRoom(req, res, next) {
    try {
      ErrorService.checkError(req);

      const room = await ChatService.getRoom(req.body);

      res.status(200).json({
        message: "Room has been successfully received",
        room,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChatController();
