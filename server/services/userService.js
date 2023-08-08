const { User } = require("../models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');

class UserService {
  async registration(email, password, role) {
    const candidate = await User.findOne({ where: {email} });
    if (candidate) {
      return ApiError.badRequest('User with such an email already exists');
    }
    // if conditions correct, register user and hash password:
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4()
    const user = await User.create(({ email, role, password: hashPassword, activationLink }))

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

    // in order to remove unneeded/unsafe fields from user
    const userDto = new UserDto(user)

    // the argument should be a plain object, not an instance
    const tokens = await tokenService.generateTokens({ ...userDto })

    // save refresh token to db object
    const savedTokens = await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
  async activate(activationLink) {
    try {
      const user = await User.findOne({ where: {activationLink} })
      if (!user) {
        return ApiError.internal(`User with such activation link does not exist`)
      }
      user.isActivated = true;
      await user.save();
      return 'Activation successful';
    } catch (error) {
      throw ApiError.internal(`An error occurred during activation: ${error.message}`);
    }
  }
  async login(email, password) {
    try {
      const userData = await User.findOne({ where: { email }})
      // todo: check, why does only general error handler works, but not these two:
      //  the answer is because of throw keyword, it should be replaced with return
      if (!userData) {
        return ApiError.badRequest('No user with such an email');
      }
      let comparePassword = bcrypt.compareSync(password, userData.password);
      if (!comparePassword) {
        return ApiError.badRequest('Wrong password');
      }
      const userDto = new UserDto(userData);
      const tokens = await tokenService.generateTokens({ ...userDto });

      // save refresh token to db object
      const savedTokens = await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto
      };
    } catch(error) {
      throw ApiError.badRequest('Error during login process', error);
    }
  }
  async logout(refreshToken) {
    try {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch(error) {
      throw ApiError.badRequest('Error during logout process', error)
    }
  }
  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        // Todo: better to name ApiError method unauthorizedRequest
        return ApiError.notFound('There is not valid or empty token');
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        // Todo: better to name ApiError method unauthorizedRequest
        return ApiError.forbidden('Refresh token has not been found or not valid');
      }
      console.log("FIND_USER",  userData.id)
      const user = await User.findByPk(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      console.log("FIND_USER", userDto.id)
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch(error) {
      throw ApiError.badRequest('Error during refresh token of user', error);
    }
  }
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService()