const jwt = require('jsonwebtoken');
const { Token } = require('../models');

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30m'}, null)

    // user has to login after 30 days of absence
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: '30d'}, null)

    return {
      accessToken, refreshToken
    }
  }
  async saveToken(userId, refreshToken) {
    // this approach assumes that authorization from the other device leads to logout (see advanced authorization 30min)
    const tokenData = await Token.findOne({ where: { user: userId }});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService()