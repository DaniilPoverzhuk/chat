const ErrorService = require("../services/error.js");
const RoomService = require("../services/room.js");
const Models = require("../models/index.js");
const ApiError = require("../error/errorHandler.js");

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

  async getById(req, res, next) {
    try {
      ErrorService.checkError(req);

      const room = RoomService.getById(req.body.roomId);

      if (!room) {
        throw new ApiError().BadRequest("При получении комнаты произошла ошибка");
      }

      return res.status(200).json({
        message: "Room has been successfully received",
        room,
      });
    } catch (err) {
      next(err);
    }
  }

  async createGroup(req, res, next) {
    try {
      ErrorService.checkError(req);

      const { name, users } = req.body;

      const group = await RoomService.createGroup(name, users);

      if (!group) {
        console.log(group);
        throw new ApiError().BadRequest("При создании группы произошла ошибка");
      }

      return res.status(200).json({
        message: "Group was successfully created",
        group,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoomController();
