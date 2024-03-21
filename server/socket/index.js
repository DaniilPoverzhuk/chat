exports.users = {};

const UserHandler = require("./handlers/user.js");
const FriendHandler = require("./handlers/friend.js");
const NotificationHandler = require("./handlers/notification.js");
const MessageHandler = require("./handlers/message.js");

exports.connect = (io, socket) => {
  UserHandler(io, socket);
  FriendHandler(io, socket);
  NotificationHandler(io, socket);
  MessageHandler(io, socket);
};
