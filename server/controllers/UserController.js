const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // hash passwords in order not to keep them in plain text
const jwt = require('jsonwebtoken')
const userService = require('../services/userService');
const roleService = require('../services/roleService');

const { User, Cart } = require('../models')

const generateJWT = (payload, key, options, callback) =>{
  return jwt.sign(payload, key, options, callback)
}
class UserController {
  async registration(req, res, next) {
    try {
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
      const userExists = await User.findOne({ where: { email }})
      if (!userExists) {
        return next(ApiError.badRequest('No user with such an email'));
      }
      let comparePassword = bcrypt.compareSync(password, userExists.password)
      if (!comparePassword) {
        return next(ApiError.badRequest('Wrong password'));
      }
      const token = generateJWT({ id: userExists.id, email: userExists.email, role: userExists.role }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
        if (err) {
          return next(ApiError.internal(`token have not been generated ${err}`))
        } else {
          return res.json({ token })
        }
      })
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
      return ApiError.internal(`An error occurred during activation: ${error.message}`);
    }
  }
  async logout(req, res, next) {
    try {

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