const { Ingredient } = require("../models");

class IngredientController {
  async createIngredient(req, res) {
    const { id, name, img, price } = req.body
    // Todo: complete ingredient creation in the PizzaUnit manner
    const ingredient = await Ingredient.create({ value })
    return res.json(ingredient)
  }
  async removeIngredient(req, res) {

  }
  async updateIngredient(req, res) {

  }
  async getIngredient(req, res) {

  }
  async getAllIngredients(req, res) {

  }
}
module.exports = new IngredientController()