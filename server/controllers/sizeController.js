const ApiError = require('../error/ApiError')
const { Size } = require('../models/index')

class SizeController {
  async createSize(req, res) {

    const { value } = req.body
    console.log(value)
    console.log(Size.tableName);
    const size = await Size.create({ value })
    return res.json(size)
  }
  async removeSize(req, res) {

  }
  async getSize(req, res) {

  }
  async getAllSizes (req, res) {

  }
}
module.exports = new SizeController()