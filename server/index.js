const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");

const AuthController = require("./controllers/auth.js");
const UserController = require("./controllers/user.js");
const TokenController = require("./controllers/token.js");
const RoomController = require("./controllers/room.js");
const MessageController = require("./controllers/message.js");

const AuthValidation = require("./validation/auth.js");
const RoomValidation = require("./validation/room.js");
const UserValidation = require("./validation/user.js");
const MessageValidation = require("./validation/message.js");

const errorMiddleware = require("./middlewares/error.js");
const authMiddleware = require("./middlewares/auth.js");

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("Подключение установлено");
});

app.post("/auth/login", AuthValidation.login(), AuthController.login);
app.post("/auth/registration", AuthValidation.registration(), AuthController.registration);
app.get("/auth/me", AuthValidation.me(), AuthController.getMe);

app.post("/users", authMiddleware, UserValidation.getAll(), UserController.getAll);

app.post("/rooms/get", authMiddleware, RoomValidation.get(), RoomController.get);

app.post("/message/send", MessageValidation.send(), MessageController.send);

app.get("/token/update", TokenController.update);
app.get("/token/check", TokenController.check);

app.use(errorMiddleware);

server.listen(PORT, () => console.log("server is working"));
