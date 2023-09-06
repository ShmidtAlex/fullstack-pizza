const { User } = require("../models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');

class UserService {
  async registration(email, password, role) {
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
        return ApiError.internalServerError(`User with such activation link does not exist`)
      }
      user.isActivated = true;
      await user.save();
      return 'Activation successful';
    } catch (error) {
      throw ApiError.internalServerError(`An error occurred during activation: ${error.message}`);
    }
  }
  async login(email, password) {
    try {
      const userData = await User.findOne({ where: { email }})

      if (!userData) {
        return ApiError.notFound('No user with such an email');
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
      throw ApiError.internalServerError('Error during login process', error);
    }
  }
  async logout(refreshToken) {
    try {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch(error) {
      throw ApiError.internalServerError('Error during logout process', error)
    }
  }
  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        return ApiError.unauthorized('There is not valid or empty token');
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);

      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        return ApiError.unauthorized('Refresh token has not been found or not valid');
      }
      const user = await User.findOne({ where: {id: userData.id} });

      const userDto = new UserDto(user);
      const tokens = await tokenService.generateTokens({...userDto});

      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch(error) {
      throw ApiError.internalServerError('Error during refresh token of user', error);
    }
  }
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService()