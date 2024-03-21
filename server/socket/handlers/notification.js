const UserService = require("../../services/user.js");

module.exports = (io, socket) => {
  const invitationFriends = async (data) => {
    const { sender_id: user_id, getter_id } = data;
    const senderUser = await UserService.getById(user_id);

    io.emit(`notification:get-friend-${getter_id}`, senderUser);
  };

  socket.on("notification:friend", invitationFriends);
};
