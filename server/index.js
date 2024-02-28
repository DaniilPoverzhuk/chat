const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const multer = require("multer");

const AuthController = require("./controllers/auth.js");
const UserController = require("./controllers/user.js");
const TokenController = require("./controllers/token.js");
const RoomController = require("./controllers/room.js");
const MessageController = require("./controllers/message.js");
const UploadController = require("./controllers/upload.js");

const AuthValidation = require("./validation/auth.js");
const RoomValidation = require("./validation/room.js");
const UserValidation = require("./validation/user.js");
const MessageValidation = require("./validation/message.js");

const errorMiddleware = require("./middlewares/error.js");
const authMiddleware = require("./middlewares/auth.js");

dotenv.config();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "uploads/images");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: "500bm" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/uploads/images", express.static("uploads/images"));

const users = {};

const getOnlineUsers = (io) => {
  io.emit("get-online-users", users);
};

io.on("connection", (socket) => {
  socket.on("add-user", (user) => {
    users[user.id] = { socketId: socket.id, user };

    getOnlineUsers(io);
  });

  socket.on("disconnect", () => {
    for (const [key, { socketId }] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[key];
      }
    }

    getOnlineUsers(io);
  });

  socket.on("send-message", (message) => {
    io.emit(message.roomId, message);

    io.emit(`get-last-message-${message.roomId}`, message);
  });
});

app.post("/auth/login", AuthValidation.login(), AuthController.login);
app.post("/auth/registration", AuthValidation.registration(), AuthController.registration);
app.get("/auth/logout", AuthController.logout);
app.get("/auth/me", AuthValidation.me(), AuthController.getMe);

app.post("/users", authMiddleware, UserValidation.getAll(), UserController.getAll);
app.post("/users/friends/get", UserValidation.getAllFriends(), UserController.getAllFriends);

app.post("/rooms/get", authMiddleware, RoomValidation.get(), RoomController.get);
app.get("/rooms/getCommunities", RoomController.getCommunities);
app.post("/rooms/createGroup", RoomValidation.createGroup(), RoomController.createGroup);
app.get("/rooms/:id", authMiddleware, RoomValidation.getById(), RoomController.getById);

app.post("/message/save", authMiddleware, MessageValidation.save(), MessageController.save);
app.post("/message/getAll", authMiddleware, MessageValidation.getAll(), MessageController.getAll);
app.post(
  "/message/getLast",
  authMiddleware,
  MessageValidation.getLast(),
  MessageController.getLast
);

app.get("/token/update", TokenController.update);
app.get("/token/check", TokenController.check);

app.post("/upload/image", upload.single("avatar"), UploadController.image);

app.use(errorMiddleware);

server.listen(PORT, () => console.log("server is working"));
