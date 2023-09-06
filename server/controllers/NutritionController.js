const { Nutrition } = require("../models");

class NutritionController {
  async createNutrition(req, res) {
    try {
      const { value } = req.body
      const nutrition = await Nutrition.create({ value })
      return res.json(nutrition)
    } catch (e) {

    }
  }
  async removeNutrition(req, res) {

  }
  async getNutrition(req, res) {

  }
  async getAllNutritionItems(req, res) {

  }
}
module.exports = new NutritionController()