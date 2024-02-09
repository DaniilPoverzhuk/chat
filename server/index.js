import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import AuthController from "./controllers/auth.js";
import errorMiddleware from "./middlewares/error.js";
import * as AuthValidation from "./validation/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/registration", AuthValidation.registration(), AuthController.registration);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server is working"));
