const { Ingredient } = require("../models");

class IngredientController {
  async createIngredient(req, res) {
    const { name, img, price } = req.body

    let existingIngredient = await Ingredient.findOne({ where: { name: name } });
    if (!existingIngredient) {
      existingIngredient = await Ingredient.create({
        img,
        name,
        price,
      });
    }
    return res.json(existingIngredient)
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