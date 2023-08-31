const ApiError = require('../error/ApiError')
const { Size } = require('../models/index')

class SizeController {
  async createSize(req, res) {
    const { value } = req.body
    const size = await Size.create({ value })
    return res.json(size)
  }
  async updateSize(req, res) {

  }
  async removeSize(req, res) {

  }
  async getSize(req, res) {

  }
  async getAllSizes (req, res, next) {
    try {
      const sizes = await Size.findAll()
      return res.json(sizes)
    } catch (e) {
      return next(ApiError.internal(`An error occurred during get list of sizes: ${e.message}`));
    }
  }
}
module.exports = new SizeController()