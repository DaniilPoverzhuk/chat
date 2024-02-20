const { Op } = require("sequelize");
const Models = require("../models/index.js");

exports.getAllOnline = async (email) => {
  try {
    const users = await Models.OnlineUser.find({
      where: {
        [Op.not]: {
          email,
        },
      },
    });

    return users;
  } catch (err) {
    return null;
  }
};

exports.changeStatus = async ({ userId }) => {
  try {
    const user = await Models.OnlineUser.findOne({ where: { user_id: userId } });

    if (user) {
      await user.destroy();
    } else {
      await Models.OnlineUser.create({ user_id: userId });
    }

    return true;
  } catch (err) {
    return null;
  }
};
