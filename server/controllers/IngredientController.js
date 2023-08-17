const { Ingredient } = require("../models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class IngredientController {
  async createIngredient(req, res, next) {
    try {
      const { name, price } = req.body
      const { img } = req.files
      
      if (!img || !name || !price) {
        return next(ApiError.badRequest('Seems like you miss image or name or price for the ingredient'));
      }

      let existingIngredient = await Ingredient.findOne({ where: { name: name } });

      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))

      if (!existingIngredient) {
        existingIngredient = await Ingredient.create({
          img: fileName,
          name,
          price,
        });
        return res.json(existingIngredient)
      } else {
        return next(ApiError.badRequest('Ingredient with this name already exists'));
      }

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