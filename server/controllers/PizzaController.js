const uuid = require('uuid');
const path = require('path');
const {
  Pizza,
  Size,
  Price,
  Nutrition,
  Pastry,
  Ingredient,
  PizzaSizePrice,
  PizzaSize,
  PastryPizza,
  PizzaIngredient
} = require("../models");
const ApiError = require('../error/ApiError');

class PizzaController {
  async createPizza(req, res, next) {
    try {
      let { name, itemSizes, itemPrices, pastryTypes, nutrition, ingredientsIds, description } = req.body
      const { img } = req.files
      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const pizza = await Pizza.create({ name, img: fileName, description })

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
            value: pastry.value,
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
      if (!!ingredientsIds) {
        ingredientsIds = JSON.parse(ingredientsIds);
        for (const id of ingredientsIds) {
          // let existingIngredient = await Ingredient.findOne({ where: { name: ingredient.value } });
          // // Todo: redo, here should be only ingredientsIds.ts Id, as the ingredientsIds themselves should already exist in db
          // // replace ingredientsIds.ts.value with ingredientsIds.ts.id, and comment/delete strings 88-94
          // if (!existingIngredient) {
          //   existingIngredient = await Ingredient.create({
          //     img: ingredient.img,
          //     name: ingredient.value,
          //     price: ingredient.price,
          //   });
          // }
          await PizzaIngredient.create({
            pizzaId: pizza.id,
            ingredientId: id,
          });
        }

        await pizza.save();
      }
      res.json(pizza)
    } catch(e) {
      next(ApiError.badRequest(e.message))
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
      next(ApiError.internal(error.message));
    }
  }

  async getAllPizzas (req, res) {
    // {includes: {all: true}} means, that we also want to get all pizza related data, including belongsTo etc.
    const pizzas = await Pizza.findAll({ include: { all: true }})
    return res.json(pizzas)
  }
}
module.exports = new PizzaController()