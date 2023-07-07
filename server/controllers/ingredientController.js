const { Ingredient } = require("../models");

class IngredientController {
  async createIngredient(req, res) {
    const { value } = req.body
    const ingredient = await Ingredient.create({ value })
    return res.json(ingredient)
  }
  async removeIngredient(req, res) {

  }
  async getIngredient(req, res) {

  }
  async getAllIngredients(req, res) {

  }
}
module.exports = new IngredientController()