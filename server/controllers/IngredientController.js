const { Ingredient } = require("../models");
const ApiError = require("../error/ApiError");

class IngredientController {
  async createIngredient(req, res, next) {
    try {
      const { name, img, price } = req.body
      console.log('INGREDIENT IMAGE', img)
      let existingIngredient = await Ingredient.findOne({ where: { name: name } });
      if (!img && !name && !price) {
        return ApiError.badRequest('Seems like you miss image or name or price for the ingredients.ts');
      }
      if (!existingIngredient) {
        existingIngredient = await Ingredient.create({
          img,
          name,
          price,
        });
      } else {
        ApiError.badRequest('Ingredient with this name already exists');
      }
      return res.json(existingIngredient)
    } catch (e) {

    }
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