const bcrypt = require("bcrypt");

const Models = require("../models/index.js");
const ApiError = require("../error/errorHandler.js");

class AuthService {
  async login({ email, password }) {
    const candidate = await Models.User.findOne({ where: { email } });

    if (!candidate) {
      throw new ApiError().BadRequest("Такой пользователь не зарегестрирован");
    }

    const isValidPassword = await bcrypt.compare(password, candidate.password);

    if (!isValidPassword) {
      throw new ApiError().BadRequest("Неверный логин или пароль");
    }

    return candidate;
  }

  async registration({ username, email, password, avatar }) {
    const candidate = await Models.User.findOne({ where: { email } });

    if (candidate) {
      throw new ApiError().BadRequest("Такой пользователь уже зарегестрирован");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = await Models.User.create({
      username,
      password: passwordHash,
      email,
      avatar,
      friends: [],
    });

    return user;
  }
}

module.exports = new AuthService();
