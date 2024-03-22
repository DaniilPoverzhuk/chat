const { Room, sequelize } = require("../models/index.js");

exports.getAll = async ({ id }) => {
  try {
    return await Room.findAll({
      where: sequelize.fn("JSON_CONTAINS", sequelize.col("users"), `${id}`),
    });
  } catch (err) {
    return null;
  }
};

exports.create = async (data) => {
  try {
    return await Room.create(data);
  } catch (err) {
    return null;
  }
};
