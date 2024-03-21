module.exports = (io, socket) => {
  const send = (message) => {
    console.log(message);
    io.emit(`message:get-${message.room_id}`, message);
  };

  socket.on("message:send", send);
};
