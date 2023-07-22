const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
})
const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
})
const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' }, // You can add more status values like 'completed', 'cancelled', etc.
});
const CartPizza = sequelize.define('cart_pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const Pizza = sequelize.define('pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  img: { type: DataTypes.STRING, allowNull: false },
  // allowedSizes: { type: DataTypes.INTEGER, allowNull: false },
  // allowedPastry: { type: DataTypes.INTEGER, allowedNull: false },
  // allowedIngredients: { type: DataTypes.INTEGER, allowedNull: true }
})

const Size = sequelize.define('size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.INTEGER, allowNull: false }
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
  protein: { type: DataTypes.INTEGER, allowNull: false },
  fats: { type: DataTypes.INTEGER, allowNull: false },
  carbohydrates: { type: DataTypes.INTEGER, allowNull: false },
  energy: { type: DataTypes.INTEGER, allowNull: false }
})
const Ingredient = sequelize.define('ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  pizzaId: { type: DataTypes.INTEGER, allowNull: false }
})
const PastryPizza = sequelize.define('pastry_pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const PizzaSize = sequelize.define('pizza_size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const PizzaSizePrice = sequelize.define('pizza_size_price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

Cart.hasMany(Order);
Order.belongsTo(Cart);

Pizza.hasMany(Price);
Price.belongsTo(Pizza);

Pizza.hasMany(Size, { as: 'itemSizes' });

Pizza.belongsToMany(Size, { through: PizzaSize });
Size.belongsToMany(Pizza, { through: PizzaSize });

Pizza.belongsToMany(Size, { through: PizzaSizePrice });
Size.belongsToMany(Pizza, { through: PizzaSizePrice });

Pizza.belongsToMany(Price, { through: PizzaSizePrice });
Price.belongsToMany(Pizza, { through: PizzaSizePrice });

Size.hasMany(Price, { as: 'itemPrices'});
Price.belongsTo(Size);

Cart.hasMany(CartPizza);
CartPizza.belongsTo(Cart);

CartPizza.belongsTo(Pizza);

Pizza.hasMany(Pastry, { as: 'pastryTypes'});
Pastry.belongsToMany(Pizza, { through: PastryPizza });

Pizza.hasOne(Nutrition, { as: 'nutrition', foreignKey: 'pizzaId'});
Nutrition.belongsTo(Pizza, { foreignKey: 'pizzaId' });

module.exports = {
  Pizza,
  Size,
  Price,
  User,
  Cart,
  Nutrition,
  CartPizza,
  Ingredient,
  Pastry,
  PizzaSizePrice,
  PizzaSize,
  PastryPizza,
  Order
}