const jwt = require("jsonwebtoken");

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
}

module.exports = new TokenService();
