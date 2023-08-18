const { Ingredient } = require("../models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
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
    } catch (error) {
      return next(ApiError.internal(`An error occurred during ingredient creation: ${error.message}`));
    }
  }
  async removeIngredient(req, res, next) {
    try {
      const { id } = req.params
      const existedIngredient = await Ingredient.findByPk(id)

      if (!existedIngredient) {
        return next(ApiError.badRequest('Ingredient with this id does not exist'));
      }

      const imagePath = path.resolve(__dirname, '..', 'static', existedIngredient.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      }

      await existedIngredient.destroy();
      return res.status(200).json({ isSuccess: true })
    } catch (error) {
      return next(ApiError.internal(`An error occurred during deleting ingredient: ${error.message}`));
    }
  }
  async updateIngredient(req, res) {

  }
  async getIngredient(req, res) {

  }
  async getAllIngredients(req, res, next) {
    try {
      const ingredients = await Ingredient.findAll()

      return res.json(ingredients)
    } catch(error) {
      return next(ApiError.internal(`An error occurred during get all ingredients: ${error.message}`));
    }
  }
}
module.exports = new IngredientController()