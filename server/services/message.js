const Models = require("../models/index.js");

exports.save = async (payload) => {
  try {
    const message = await Models.Message.create(payload);

    return message;
  } catch (err) {
    return null;
  }
};

exports.getAll = async (roomId) => {
  try {
    const messages = await Models.Message.findAll({ where: { roomId } });

    return messages;
  } catch (err) {
    return null;
  }
};

exports.getLast = async (roomId) => {
  try {
    const messages = await Models.Message.findAll({ where: { roomId } });
    const lastMessage = messages.at(-1);

    return lastMessage;
  } catch (error) {
    return null;
  }
};
