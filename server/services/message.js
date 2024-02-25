const Models = require("../models/index.js");
const dto = require("../dto/index.js");

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

    if (!messages.length) {
      return "";
    }

    const lastMessage = messages.at(-1);

    return dto(lastMessage);
  } catch (err) {
    console.log(err);
    return null;
  }
};
