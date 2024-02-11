const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const AuthController = require("./controllers/auth.js");
const errorMiddleware = require("./middlewares/error.js");
const AuthValidation = require("./validation/auth.js");

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

app.post("/login", AuthValidation.login(), AuthController.login);
app.post("/registration", AuthValidation.registration(), AuthController.registration);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server is working"));
