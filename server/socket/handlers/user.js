const { users } = require("../index.js");

module.exports = (io, socket) => {
  const updateOnlineStatus = () => {
    io.emit(`user:get-online-status`, users);
  };

  const connect = (userId) => {
    users[userId] = socket.id;
    updateOnlineStatus();
  };

  const disconnect = (userId) => {
    delete users[userId];
    updateOnlineStatus();
  };

  socket.on("user:connect", connect);
  socket.on("user:disconnect", disconnect);
};
