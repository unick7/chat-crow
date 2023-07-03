const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
  console.log("hello");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "admin",
      text: `${users[socket.id]} has joined`,
    });
    // socket.emit("welcome", {
    //   user: "admin",
    //   text: `Welcome to the chat ${users[socket.id]}`,
    // });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnnect", ({ user }) => {
    socket.broadcast.emit("leave", {
      user: "admin",
      text: `${users[socket.id]} has left`,
    });
    console.log(`${users[socket.id]} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
