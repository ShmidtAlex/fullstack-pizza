// With this setup, you can now perform queries and create associations
// between pizzas, sizes, and prices using Sequelize.
// For example, you can retrieve all prices for a specific pizza:
// it's just an example
const Pizza = require('./pizza-model');
const Price = require('./price-model');

async function getPizzaPrices(pizzaId) {
  const pizza = await Pizza.findByPk(pizzaId, { include: Price });
  if (!pizza) {
    throw new Error('Pizza not found.');
  }
  return pizza.Prices;
}

// Usage
const pizzaId = 1; // ID of the desired pizza
getPizzaPrices(pizzaId).then(prices => {
  console.log(prices);
}).catch(error => {
  console.error(error);
});