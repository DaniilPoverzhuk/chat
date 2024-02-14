const jwt = require("jsonwebtoken");
const Models = require("../models/index.js");

class TokenService {
  async generateTokens(payload) {
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, {
      expiresIn: "2m",
    });
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN, {
      expiresIn: "1m",
    });

    return { refreshToken, accessToken };
  }

  async saveToken(userId, { refreshToken }) {
    const token = await Models.Token.findOne({ where: { userId } });

    if (token) {
      return await token.update({ refreshToken });
    }

    const newToken = await Models.Token.create({ userId, refreshToken });

    return newToken;
  }

  getRefreshTokenFromCookie(req) {
    return req.headers.cookie
      .split(" ")
      .find((item) => item.split("=")[0] === "refreshToken")
      .split("=")[1];
  }

  isValidAccessToken(accessToken) {
    try {
      const token = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS_TOKEN);

      return token;
    } catch (err) {
      return null;
    }
  }

  isValidRefreshToken(refreshToken) {
    try {
      const token = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

      return token;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
