const ErrorService = require("../services/error.js");
const RoomService = require("../services/room.js");

class RoomController {
  async get(req, res, next) {
    try {
      ErrorService.checkError(req);

      const room = await RoomService.get(req.body);

      res.status(200).json({
        message: "Room has been successfully received",
        room,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoomController();
