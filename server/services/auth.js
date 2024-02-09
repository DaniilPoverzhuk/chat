import bcrypt from "bcrypt";

import { user, Sequelize } from "../models";
import ApiErorr from "../error/errorHandler.js";

console.log(user);

class AuthService {
  async login() {}

  async registration({ username, email, password }) {
    // const candiate = await Models.User.find({ where: email });
    // if (candiate) {
    //   throw new ApiErorr().BadRequest("Такой пользователь уже зарегестрирован");
    // }
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const passwordHash = bcrypt.hashSync(password, salt);
    // console.log(passwordHash);
    // const user = await Models.User.create({
    //   username,
    //   password,
    //   email,
    // });
  }
}

export default new AuthService();
