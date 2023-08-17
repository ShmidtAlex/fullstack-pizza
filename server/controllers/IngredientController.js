const { Ingredient } = require("../models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class IngredientController {
  async createIngredient(req, res, next) {
    try {
      const { name, price } = req.body
      const { img } = req.files
      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))

      let existingIngredient = await Ingredient.findOne({ where: { name: name } });
      if (!img && !name && !price) {
        return ApiError.badRequest('Seems like you miss image or name or price for the ingredients.ts');
      }
      if (!existingIngredient) {
        existingIngredient = await Ingredient.create({
          img: fileName,
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