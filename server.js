const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = app.listen(3000);

const io = socketio(server);

app.use(express.static("public"));

io.on("connection", (connectedSocket) => {
  connectedSocket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  connectedSocket.on("typing", (data) => {
    connectedSocket.broadcast.emit("typing", data);
  });
});
