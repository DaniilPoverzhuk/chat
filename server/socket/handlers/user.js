const users = require("../index.js");

module.exports = (io, socket) => {
  const getOnline = () => {
    io.emit("user:get-online", users);
  };

  const add = (user) => {
    users[user.id] = socket.id;
  };

  socket.on("user:add", add);
  socket.on("user:get-online", getOnline);
};
