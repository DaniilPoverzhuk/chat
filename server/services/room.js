const Models = require("../models/index.js");
const dto = require("../dto/index.js");
const { Op } = require("sequelize");

exports.get = async ({ senderId, getterId }) => {
  const room = dto(
    await Models.Room.findOne({
      where: {
        [Op.or]: [
          {
            users: {
              getterId,
              senderId,
            },
          },
          {
            users: {
              getterId: senderId,
              senderId: getterId,
            },
          },
        ],
      },
    })
  );

  if (!room) {
    const newRoom = dto(
      await Models.Room.create({
        users: { senderId, getterId },
      })
    );

    return newRoom;
  }

  return room;
};

exports.getById = async (id) => {
  try {
    const room = await Models.Room.findOne({ where: id });

    return room;
  } catch (err) {
    return null;
  }
};

exports.createGroup = async (name, users = [], avatar = null) => {
  try {
    const group = await Models.Room.create({ name, users, avatar });

    return group;
  } catch (err) {
    return null;
  }
};
