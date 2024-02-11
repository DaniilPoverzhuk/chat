const jwt = require("jsonwebtoken");
const Models = require("../models/index.js");

class TokenService {
  async generateTokens(payload) {
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN, {
      expiresIn: "30d",
    });
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, {
      expiresIn: "15m",
    });

    return { refreshToken, accessToken };
  }

  async saveToken(userId, { refreshToken }) {
    const token = await Models.Token.findOne({ where: { userId } });

    console.log(token, "- TOKEN (saveToken)");

    if (token) {
      return await token.update({ refreshToken });
    }

    console.log(userId);

    const newToken = await Models.Token.create({ userId, refreshToken });

    console.log(newToken);

    return newToken;
  }
}

module.exports = new TokenService();
