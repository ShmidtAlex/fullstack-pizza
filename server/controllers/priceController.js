const { Price } = require("../models");

class PriceController {
  async createPrice(req, res) {
    const { value } = req.body
    const price = await Price.create({ value })
    return res.json(price)
  }
  async removePrice(req, res) {

  }
  async getPrice(req, res) {

  }
  async getAllPrices (req, res) {

  }
}
module.exports = new PriceController()