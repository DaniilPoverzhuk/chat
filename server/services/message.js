const Models = require("../models/index.js");

exports.save = async (payload) => {
  try {
    const message = await Models.Message.create(payload);

    return message;
  } catch (err) {
    return null;
  }
};
