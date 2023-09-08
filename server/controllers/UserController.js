const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // hash passwords in order not to keep them in plain text
const jwt = require('jsonwebtoken')
const userService = require('../services/userService');
const roleService = require('../services/roleService');
// the second part of request's body validation:
const { validationResult } = require('express-validator');
const { User, Cart } = require('../models')

const generateJWT = (payload, key, options, callback) =>{
  return jwt.sign(payload, key, options, callback)
}
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()));
      }
      const {email, password, role} = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest('Wrong email or password'));
      }

      const candidate = await User.findOne({ where: {email} });

      if (candidate && candidate.id) {
        next(ApiError.badRequest('DUser with such email already exists'));
      }

      const userData = await userService.registration(email, password, role)

      await roleService.addRole(userData.user, role)
      const cart = await Cart.create({userId: userData.user.id});

      // httpOnly prevents access to refreshToken in browser
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);

    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during registration: ${error}`));
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()));
      }
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during login: ${error.message}`));
    }
  }
  async checkIsAuth(req, res, next) {
    try {
      const token = generateJWT(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
    } catch(error) {
      return next(ApiError.internalServerError(`An error occurred during check authentication: ${error.message}`));
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);

    } catch (error) {
      throw ApiError.internalServerError(`An error occurred during activation: ${error.message}`);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken)

      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during logout: ${error.message}`));
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during refresh token: ${error.message}`));
    }
  }
  async updateUser(req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during updating user: ${error.message}`));
    }
  }
  async deleteUser(req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during deleting user: ${error.message}`));
    }
  }
  // for business purposes only
  async getAllUsers (req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users)
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during getting the list of users: ${error.message}`));
    }
  }
  async updateAccountData(req, res, next) {
    try {
     // todo: add method's content for updating user's personal data
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during updating personal user's data: ${error.message}`));
    }
  }
}

module.exports = new UserController()