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
        // Todo: badRequest has to accept an array
        return next(ApiError.badRequest('Validation error', errors.array()));
      }
      const {email, password, role} = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Wrong email or password'));
      }

      const userData = await userService.registration(email, password, role)
      await roleService.addRole(userData.user, role)

      const cart = await Cart.create({userId: userData.user.id});

      // httpOnly prevents access to refreshToken in browser
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);

    } catch (error) {
      return next(ApiError.internal(`An error occurred during registration: ${error.message}`));
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // Todo: badRequest has to accept an array
        return next(ApiError.badRequest('Validation error', errors.array()));
      }
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return next(ApiError.internal(`An error occurred during login: ${error.message}`));
    }
  }
  async checkIsAuth(req, res, next) {
    try {
      const token = generateJWT(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
    } catch(error) {
      return next(ApiError.internal(`An error occurred during check authentication: ${error.message}`));
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);

    } catch (error) {
      throw ApiError.internal(`An error occurred during activation: ${error.message}`);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken)

      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (error) {
      return next(ApiError.internal(`An error occurred during logout: ${error.message}`));
    }
  }
  async updateUser(req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internal(`An error occurred during updating user: ${error.message}`));
    }
  }
  async deleteUser(req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internal(`An error occurred during deleting user: ${error.message}`));
    }
  }
  // for business purposes only
  async getAllUsers (req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internal(`An error occurred during getting the list of users: ${error.message}`));
    }
  }
}

module.exports = new UserController()