const Models = require("../models/index.js");
const dto = require("../dto/index.js");

exports.get = async ({ senderId, getterId }) => {
  const room = dto(
    await Models.Room.findOne({
      where: {
        users: {
          getterId,
          senderId,
        },
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
