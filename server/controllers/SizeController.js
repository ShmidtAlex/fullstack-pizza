const ApiError = require('../error/ApiError')
const { Size } = require('../models/index')

class SizeController {
  async createSize(req, res, next) {
    try {
      const { value } = req.body
      const isSizeExist = await Size.findOne({ where: { value }})
      // Todo: this method could be evoked only if we are in pizza's redact mode
      if (isSizeExist) {
        return next(ApiError.badRequest(`${value} size already exist`))
      }
      const createdSize = await Size.create({ value })
      return res.json(createdSize)
    } catch (e) {
      return next(ApiError.internalServerError(`An error occurred during creation of a new size: ${e.message}`));
    }
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
      return next(ApiError.internalServerError(`An error occurred during get list of sizes: ${e.message}`));
    }
  }
}
module.exports = new SizeController()