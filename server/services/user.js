const { User, Friend, sequelize } = require("../models/index.js");
const { Op, Sequelize, QueryTypes } = require("sequelize");

exports.delete = async (email) => {
  try {
    const deletedUser = await User.destroy({ where: { email } });

    return deletedUser;
  } catch (err) {
    return null;
  }
};

exports.getById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });

    return user;
  } catch (err) {
    return null;
  }
};

exports.get = async (email, limit) => {
  try {
    email, limit;
    const params = limit
      ? {
          where: { [Op.not]: { email } },
          limit,
        }
      : { where: { [Op.not]: { email } } };

    const users = await User.findAll(params);

    return users;
  } catch (err) {
    return null;
  }
};

exports.getNonFriends = async ({ id, limit, page }) => {
  try {
    const isEmptyTable = !(await Friend.findAll()).length;

    if (isEmptyTable) {
      const users = await User.findAll({ where: { [Op.not]: { id } } });
      return users;
    }

    const queryGetNonFriends = `
        SELECT * 
        FROM users
        WHERE id != ${id} AND id NOT IN (
            SELECT CASE
                      WHEN user_id = ${id} THEN friend_id
                      WHEN friend_id = ${id} THEN user_id
                  END AS friend
            FROM friends
            WHERE user_id = ${id} OR friend_id = ${id}
        )
      `;

    const users = await sequelize.query(queryGetNonFriends, {
      type: QueryTypes.SELECT,
    });

    return users;
  } catch (err) {
    return null;
  }
};
