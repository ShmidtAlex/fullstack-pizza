const {Role, User, UserRole} = require("../models");
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
      const user = await User.findOne({ activationLink })
      if (!user) {
        return ApiError.internal(`User with such activation link does not exist: ${error.message}`)
      }
      user.isActivated = true;
      await user.save();
      return 'Activation successful';
    } catch (error) {
      return ApiError.internal(`An error occurred during activation: ${error.message}`);
    }
  }
}

module.exports = new UserService()