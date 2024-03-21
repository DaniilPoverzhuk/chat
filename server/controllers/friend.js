const checkValidateRequest = require("../utils/checkValidateRequest");
const ApiError = require("../error/handler");
const FriendService = require("../services/friend.js");

const { Friend_Requests, Friend } = require("../models/index.js");
const { Op } = require("sequelize");

class FriendController {
  async getAll(req, res, next) {
    try {
      checkValidateRequest(req);

      const friends = await FriendService.getAll(req.body);

      if (!friends) {
        throw new ApiError().BadRequest(
          "При получении друзей произошла ошибка"
        );
      }

      return res.status(200).json({
        message: "Друзья успешно получены",
        friends,
      });
    } catch (err) {
      next(err);
    }
  }

  async getFriendRequests(req, res, next) {
    try {
      checkValidateRequest(req);

      const { id, orderBy } = req.body;

      const friendRequests = await Friend_Requests.findAll({
        where: { [orderBy]: id },
      });

      if (!friendRequests) {
        throw new ApiError().BadRequest(
          "При получении заявок в друья произошла ошибка"
        );
      }

      return res.status(200).json({
        message: "Заявки успешно получены",
        friendRequests,
      });
    } catch (err) {
      next(err);
    }
  }

  async sendFriendRequest(req, res, next) {
    try {
      checkValidateRequest(req);

      const { sender_id, getter_id } = req.body;

      const isExistsFriendRequest = await Friend_Requests.findOne({
        where: {
          [Op.or]: [
            { sender_id, getter_id },
            { getter_id, sender_id },
          ],
        },
      });

      if (isExistsFriendRequest) {
        throw new ApiError().BadRequest("Заявка уже отправлена");
      }

      const isExistsFriend = await Friend.findOne({
        where: {
          [Op.or]: [
            { user_id: sender_id, friend_id: getter_id },
            { friend_id: getter_id, user_id: sender_id },
          ],
        },
      });

      if (isExistsFriend) {
        throw new ApiError().BadRequest(
          "Этот пользователь уже является вашим другом"
        );
      }

      const isCreated = await FriendService.createFriendRequest(req.body);

      if (!isCreated) {
        throw new ApiError().BadRequest("При отправке заявки произошла ошибка");
      }

      return res.status(200).json({
        message: "Заявка успешно отправлена",
      });
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    try {
      checkValidateRequest(req);

      const { user_id, friend_id } = req.body;

      const isExists = await Friend.findOne({
        where: {
          [Op.or]: [
            { user_id, friend_id },
            { friend_id, user_id },
          ],
        },
      });

      if (isExists) {
        throw new ApiError().BadRequest(
          "Этот пользователь уже является вашим другом"
        );
      }

      const friend = await FriendService.add(req.body);

      if (!friend) {
        throw new ApiError().BadRequest(
          "При добавлении друга произошла ошибка"
        );
      }

      const isDeleted = await FriendService.deleteFriendRequest(req.body);

      if (!isDeleted) {
        await FriendService.delete(friend.id);

        throw new ApiError().BadRequest(
          "При добавлении друга произошла ошибка"
        );
      }

      return res.status(200).json({
        message: "Друг успешно добавлен",
        friend,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FriendController();
