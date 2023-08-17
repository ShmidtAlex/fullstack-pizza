const { Nutrition } = require("../models");

class NutritionController {
  async createNutrition(req, res) {
    const { value } = req.body
    const nutrition = await Nutrition.create({ value })
    return res.json(nutrition)
  }
  async removeNutrition(req, res) {

  }
  async getNutrition(req, res) {

  }
  async getAllNutritionItems(req, res) {

  }
}
module.exports = new NutritionController()