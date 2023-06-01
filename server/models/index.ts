const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
})
const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const CartPizza = sequelize.define('cart_pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const Pizza = sequelize.define('pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
})
const Size = sequelize.define('size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.INTEGER
  }
})
const Price = sequelize.define('price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})
const Pastry = sequelize.define('pastry', {
  id: { type:  DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
})
const Nutrition = sequelize.define('nutrition', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // pizza_id: { type: DataTypes.INTEGER, primaryKey: false } we don't need external keys, because sequelize do it itself, when we set relations
  protein: { type: DataTypes.INTEGER, allowNull: false },
  fats: { type: DataTypes.INTEGER, allowNull: false },
  carbohydrates: { type: DataTypes.INTEGER, allowNull: false },
  energy: { type: DataTypes.INTEGER, allowNull: false }
})
const Set = sequelize.define('set', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const Ingredient = sequelize.define('ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true }
})
const PastryPizza = sequelize.define('pastry_pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const SetIngredient = sequelize.define('set_ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
Pizza.hasMany(Price);
Price.belongsTo(Pizza);

Size.hasMany(Price);
Price.belongsTo(Size);

Cart.hasMany(CartPizza);
CartPizza.belongsTo(Cart);

Pizza.hasMany(CartPizza);
CartPizza.belongsTo(Pizza);

Pizza.hasMany(Pastry);
Pastry.belongsToMany(Pizza, { through: PastryPizza });

Pizza.hasOne(Nutrition);
Nutrition.belongsTo(Pizza);

Pizza.hasOne(Set);
Set.belongsTo(Pizza)

Set.hasMany(Ingredient);
Ingredient.belongsToMany(Set, { through: SetIngredient })

module.exports = {
  Pizza, Size, Price, User, Cart, Nutrition, CartPizza, Set, Ingredient
}