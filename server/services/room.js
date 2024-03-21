const { Room, sequelize } = require("../models/index.js");

exports.getAll = async ({ id }) => {
  try {
    const rooms = await Room.findAll({
      where: sequelize.fn("JSON_CONTAINS", sequelize.col("users"), `${id}`),
    });

    return rooms;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.create = async (data) => {
  try {
    const room = await Room.create(data);

    return room;
  } catch (err) {
    err;
    return null;
  }
};
