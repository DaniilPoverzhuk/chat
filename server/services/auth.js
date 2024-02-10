const bcrypt = require("bcrypt");

const Models = require("../models/index.js");
const ApiError = require("../error/errorHandler.js");

class AuthService {
  async login({ username, email, password, avatar }) {
    const candidate = await Models.User.find({ where: email });

    if (!candidate) {
      throw new ApiError().BadRequest("Такой пользователь не зарегестрирован");
    }

    const isValidPassword = bcrypt.compare(password, candidate.password);

    if (!isValidPassword) {
      throw new ApiError().BadRequest("Неверный логин или пароль");
    }

    return candidate;
  }

  async registration({ username, email, password }) {
    const candidate = await Models.User.find({ where: email });

    if (candidate) {
      throw new ApiError().BadRequest("Такой пользователь уже зарегестрирован");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = await Models.User.create({
      username,
      password: passwordHash,
      email,
    });

    return user;
  }
}

module.exports = new AuthService();
