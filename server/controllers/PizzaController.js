const uuid = require('uuid');
const path = require('path');
const {
  Pizza,
  Size,
  Price,
  Nutrition,
  Pastry,
  PizzaSizePrice,
  PizzaSize,
  PastryPizza,
  PizzaIngredient
} = require("../models");
const ApiError = require('../error/ApiError');

class PizzaController {
  async createPizza(req, res, next) {
    try {
      let { name, itemSizes, itemPrices, pastryTypes, nutrition, ingredients, description } = req.body
      const { img } = req.files
      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const isExist = await Pizza.findOne({ where: { name }})

      if (isExist) {
        return next(ApiError.badRequest('Pizza with such a name already exists'))
      }
      const pizza = await Pizza.create({ name, img: fileName, description })

      if (itemSizes && itemPrices) {
        itemSizes = JSON.parse(itemSizes);
        itemPrices = JSON.parse(itemPrices)
        for (let i = 0; i < itemSizes.length; i++) {
          let price = itemPrices[i]
          let size = itemSizes[i]
          // we NEED it because all pizzas theoretically could have different set of sizes
          let newSize = await Size.create({
            value: size.value,
            pizzaId: pizza.id
          });

          let newPrice = await Price.create({
            value: price.value,
            pizzaId: pizza.id,
            sizeId: newSize.id
          });

          await PizzaSize.create({
            pizzaId: pizza.id,
            sizeId: newSize.id
          });

          await PizzaSizePrice.create({
            pizzaId: pizza.id,
            sizeId: newSize.id,
            priceId: newPrice.id
          });
        }
      }

      if (!!pastryTypes) {
        pastryTypes = JSON.parse(pastryTypes)
        for (let pastry of pastryTypes) {
          const newPastry = await Pastry.create({
            value: pastry,
            pizzaId: pizza.id
          });

          await PastryPizza.create({
            pizzaId: pizza.id,
            pastryId: newPastry.id
          });
        }
      }
      if (!!nutrition) {
        nutrition = JSON.parse(nutrition)
        const { protein, fats, carbohydrates, energy } = nutrition
        await Nutrition.create({
          protein,
          fats,
          carbohydrates,
          energy,
          pizzaId: pizza.id
        })
      }
      if (ingredients.length > 0) {
        ingredients = JSON.parse(ingredients);
        for (const id of ingredients) {
          await PizzaIngredient.create({
            pizzaId: pizza.id,
            ingredientId: id,
          });
        }

        await pizza.save();
      }
      res.json(pizza)
    } catch(e) {
      next(ApiError.internalServerError(e.message))
    }
  }
  async removePizza(req, res) {

  }
  async updatePizza(req, res) {

  }
  async getPizza(req, res, next) {
    try {
      const { id } = req.params;

      const pizza = await Pizza.findOne({
        where: { id: id },
        include: { all: true }
      });

      if (!pizza) {
        return res.status(404).json({ message: 'Pizza not found' });
      }

      res.json(pizza);
    } catch (error) {
      next(ApiError.internalServerError(error.message));
    }
  }

  async getAllPizzas (req, res) {
    // {includes: {all: true}} means, that we also want to get all pizza related data, including belongsTo etc.
    const pizzas = await Pizza.findAll({ include: { all: true }})
    return res.json(pizzas)
  }
}
module.exports = new PizzaController()