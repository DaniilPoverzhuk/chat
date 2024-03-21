const checkValidateRequest = require("../utils/checkValidateRequest.js");
const RoomService = require("../services/room.js");
const ApiError = require("../error/handler.js");

class RoomController {
  async getAll(req, res, next) {
    try {
      checkValidateRequest(req);

      const rooms = await RoomService.getAll(req.body);

      if (!rooms) {
        throw new ApiError().BadRequest(
          "При получении комнат произошла ошибка"
        );
      }

      return res
        .status(200)
        .json({ rooms, message: "Комнаты успешно получены" });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    checkValidateRequest(req);

    const room = await RoomService.create(req.body);

    if (!room) {
      throw new ApiError().BadRequest("При создании комнаты произошла ошибка");
    }

    res.status(200).json({
      message: "Комната успешно создана",
      room,
    });
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoomController();
