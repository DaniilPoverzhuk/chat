const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthController = require("./controllers/auth.js");
const UserController = require("./controllers/user.js");
const TokenController = require("./controllers/token.js");

const AuthValidation = require("./validation/auth.js");

const errorMiddleware = require("./middlewares/error.js");
const authMiddleware = require("./middlewares/auth.js");

dotenv.config();

const app = express();
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

app.post("/auth/login", AuthValidation.login(), AuthController.login);
app.post("/auth/registration", AuthValidation.registration(), AuthController.registration);
app.get("/auth/me", AuthValidation.me(), AuthController.getMe);

app.get("/users", authMiddleware, UserController.getAll);

app.get("/token/updapte", TokenController.update);
app.get("/token/check", TokenController.check);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server is working"));
