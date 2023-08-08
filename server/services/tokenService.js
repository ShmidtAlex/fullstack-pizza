const jwt = require('jsonwebtoken');
const { Token } = require('../models');
const ApiError = require("../error/ApiError");

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
  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: {refreshToken} });
    // Todo check why does returns 1
    return tokenData;
  }
  async validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY, null, null);
      return userData;
    } catch(error) {
      return null;
    }
  }
  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_KEY, null, null);
      return userData;
    } catch(error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      const userData = Token.findOne({ where: {refreshToken}});
      return userData;
    } catch(error) {
      return null;
    }
  }
}

module.exports = new TokenService()