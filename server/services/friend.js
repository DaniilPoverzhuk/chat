const { Friend, User, Friend_Requests } = require("../models/index.js");

exports.getAll = async ({ id }) => {
  try {
    const friendsId = await Friend.findAll({
      where: { [Op.or]: [{ user_id: id }, { friend_id: id }] },
    });
    const friends = await Promise.all(
      friendsId.map(({ friend_id }) =>
        User.findOne({ where: { id: friend_id } })
      )
    );

    return friends;
  } catch (err) {
    return null;
  }
};

exports.add = async (data) => {
  try {
    return await Friend.create(data);
  } catch (err) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    return await Friend.destroy({ where: { id } });
  } catch (err) {
    return null;
  }
};

exports.createFriendRequest = async (data) => {
  try {
    return await Friend_Requests.create(data);
  } catch (err) {
    return null;
  }
};

exports.deleteFriendRequest = async (data) => {
  try {
    const { user_id: getter_id, friend_id: sender_id } = data;
    return await Friend_Requests.destroy({ where: { sender_id, getter_id } });
  } catch (err) {
    return null;
  }
};
