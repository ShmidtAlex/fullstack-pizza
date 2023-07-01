const ApiError = require('../error/ApiError')
const { User } = require('../models/index')

class UserController {
  async register(req, res) {

  }
  async login(req, res) {

  }
  async checkIsAuth(req, res, next) {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('no  id found'))
      }
      res.json(id)
  }
  async deleteUser(req, res) {

  }
  // for business purposes only
  async getAllUsers (req, res) {

  }
}

module.exports = new UserController()