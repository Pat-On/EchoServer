const socketIo = require("socket.io");

function SocketProvider(server) {
  const io = socketIo(server);
  const sockets = [];

  const listen = () => {
    io.on("connection", (socket) => {
      console.log("New client connected");
      socket.emit(
        "welcomeEvent",
        `Connected to server. Socket id: ${socket.id}`
      );
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
      sockets.push(socket);
    });
  };

  const broadcast = (data) => {
    sockets.map((socket) => {
      socket.emit("broadcastEvent", JSON.stringify(data));
    });
  };

  return {
    listen: listen,
    broadcast: broadcast,
    io: io,
    sockets: sockets,
  };
}

module.exports = SocketProvider;
