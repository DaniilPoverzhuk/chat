const UserService = require("../../services/user.js");

module.exports = (io, socket) => {
  const add = async ({ user_id, friend_id }) => {
    const user = await UserService.getById(user_id);

    io.emit(`friend:get-${friend_id}`, user);
  };

  const friendRequest = async ({ sender_id, getter_id }) => {
    const friend = await UserService.getById(sender_id);

    console.log(friend, "- friendRequest");

    io.emit(`friend:get-friend-request-${getter_id}`, friend);
  };

  const resultFriendRequest = async ({
    sender_id,
    getter_id,
    room,
    isAccepted,
  }) => {
    console.log(room);
    io.emit(`friend:get-response-friend-request-${sender_id}-${getter_id}`, {
      isAccepted,
      room,
    });
  };

  socket.on("friend:add", add);
  socket.on("friend:friend-request", friendRequest);
  socket.on("friend:result-friend-request", resultFriendRequest);
};
