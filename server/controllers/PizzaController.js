const uuid = require('uuid');
const path = require('path');
const {
  Pizza,
  Size,
  Price,
  Nutrition,
  Pastry,
  IngredientsSet,
  Ingredient,
  PizzaSizePrice,
  PizzaSize,
  PastryPizza
} = require("../models");
const ApiError = require('../error/ApiError');

class PizzaController {
  async createPizza(req, res, next) {
    try {
      let { name, itemSizes, itemPrices, pastryTypes, nutrition, ingredients } = req.body
      const { img } = req.files
      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const pizza = await Pizza.create({ name, img: fileName })

      if (itemSizes && itemPrices) {
        itemSizes = JSON.parse(itemSizes);
        itemPrices = JSON.parse(itemPrices)
        for (let i = 0; i < itemSizes.length; i++) {
          let price = itemPrices[i]
          let size = itemSizes[i]

          let newSize = await Size.create({
            value: size,
            pizzaId: pizza.id
          });

          let newPrice = await Price.create({
            value: price,
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
            name: pastry,
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
      if (!!ingredients) {
        ingredients = JSON.parse(ingredients);
        console.log('INGREDIENTS',ingredients)
        const ingredientsSet = await IngredientsSet.create({});

        for (const ingredient of ingredients) {
          await Ingredient.create({
            name: ingredient.value,
            price: ingredient.price,
            pizzaId: pizza.id
          });
        }

        // Assign the ingredientsSetId to the pizza
        pizza.ingredientsSetId = ingredientsSet.id;
        await pizza.save();
      }
      res.json(pizza)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async removePizza(req, res) {

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
      next(ApiError.internal(error.message));
    }
  }

  async getAllPizzas (req, res) {
    const pizzas = await Pizza.findAll({ include: { all: true}})
    return res.json(pizzas)
  }
}
module.exports = new PizzaController()