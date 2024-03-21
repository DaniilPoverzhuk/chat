const { Message } = require("../models/index.js");

exports.getAll = async ({ room_id }) => {
  try {
    return await Message.findAll({ where: { room_id } });
  } catch (err) {
    return null;
  }
};

exports.save = async (data) => {
  try {
    return await Message.create(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};
