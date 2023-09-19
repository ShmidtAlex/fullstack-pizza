const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

// TOdo: may be make sense to add field isActivated: boolean (confirmation that user activated account through the email)
// Todo: and activationLink: string - the link for activation itself (see advanced JWT authorization UlbTv)
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER', 'VISITOR', 'REDACTOR', 'SUPERADMIN'),
    defaultValue: 'VISITOR',
  }
})
const UserAccount = sequelize.define('user_account', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: true },
  firstName: { type: DataTypes.STRING, allowedNull: true },
  lastName: { type: DataTypes.STRING, allowedNull: true },
  contactPhone: { type: DataTypes.STRING, allowedNull: false }
})

const UserDeliveryAddress = sequelize.define('delivery_addresses', {
  city: { type: DataTypes.STRING, allowedNull: false },
  string: { type: DataTypes.STRING, allowedNull: false },
  building: { type: DataTypes.STRING, allowedNull: true },
  apartments: { type: DataTypes.STRING, allowedNull: true }
})

const UserPaymentMethod = sequelize.define('payment_methods', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('card', 'paypal', 'googlepay', 'amex', 'applepay'), allowNull: false },
  cardNumber: { type: DataTypes.STRING },
  expirationMonth: { type: DataTypes.INTEGER },
  expirationYear: { type: DataTypes.INTEGER },
  paypalEmail: { type: DataTypes.STRING },
})

// for keeping refresh token, IP address, fingerPrint of browser, user id and others
const Token = sequelize.define('token', {
  user: { type: DataTypes.INTEGER, primaryKey: true },
  refreshToken: { type: DataTypes.STRING, allowNull: false }
})

const Role = sequelize.define('role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const UserRole = sequelize.define('user_role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
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
  description: { type: DataTypes.STRING, allowedNull: false }
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
  value: { type: DataTypes.STRING, allowNull: true },
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
  img: { type: DataTypes.STRING, allowNull: false }
})

const PastryPizza = sequelize.define('pastry_pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const PizzaSize = sequelize.define('pizza_size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pizzaId: { type: DataTypes.INTEGER, allowNull: false },
  sizeId: { type: DataTypes.INTEGER, allowNull: false },
});

const PizzaSizePrice = sequelize.define('pizza_size_price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pizzaId: { type: DataTypes.INTEGER, allowNull: false },
  sizeId: { type: DataTypes.INTEGER, allowNull: false },
  priceId: { type: DataTypes.INTEGER, allowNull: false },
});

const PizzaIngredient = sequelize.define('pizza_ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(UserAccount)
UserAccount.belongsTo(User)

UserAccount.hasMany(UserDeliveryAddress, {
  foreignKey: 'userAccountId',
  as: 'deliveryAddresses',
})
UserDeliveryAddress.belongsTo(UserAccount, {
  foreignKey: 'userAccountId',
})

UserAccount.hasMany(UserPaymentMethod, {
  foreignKey: 'userAccountId',
  as: 'paymentMethods',
})
UserPaymentMethod.belongsTo(UserAccount, {
  foreignKey: 'userAccountId',
})

User.hasMany(Order);
Order.belongsTo(User);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// Todo: learn db migration
Token.belongsTo(User, { foreignKey: 'user', as: 'tokenUser' });
User.hasOne(Token, { foreignKey: 'user', as: 'userToken' });

Cart.hasMany(Order);
Order.belongsTo(Cart);

Pizza.hasMany(Price, { onDelete: 'CASCADE' });
Price.belongsTo(Pizza, { onDelete: 'CASCADE' });

Pizza.hasMany(Size, { as: 'itemSizes', onDelete: 'CASCADE' });

Pizza.belongsToMany(Size, { through: PizzaSize });
Size.belongsToMany(Pizza, { through: PizzaSize });

Pizza.belongsToMany(Size, { through: PizzaSizePrice });
Size.belongsToMany(Pizza, { through: PizzaSizePrice });

Pizza.belongsToMany(Price, { through: PizzaSizePrice });
Price.belongsToMany(Pizza, { through: PizzaSizePrice });

Size.hasMany(Price, { as: 'itemPrices'});
Price.belongsTo(Size);

// Ingredients in database won't be deleted, despite of Cascade option, because in many to many relations
// they may be involved in other pizza unlike prices and sizes which hardly related with a certain pizza
Pizza.belongsToMany(Ingredient, { through: PizzaIngredient, onDelete: 'CASCADE' });
Ingredient.belongsToMany(Pizza, { through: PizzaIngredient, onDelete: 'CASCADE' });

Cart.hasMany(CartPizza);
CartPizza.belongsTo(Cart);

CartPizza.belongsTo(Pizza);

Pizza.hasMany(Pastry, { as: 'pastryTypes', onDelete: 'CASCADE' });
Pastry.belongsToMany(Pizza, { through: PastryPizza });

Pizza.hasOne(Nutrition, { as: 'nutrition', foreignKey: 'pizzaId', onDelete: 'CASCADE' });
Nutrition.belongsTo(Pizza, { foreignKey: 'pizzaId', onDelete: 'CASCADE' });

module.exports = {
  Pizza,
  Size,
  Price,
  User,
  Cart,
  Nutrition,
  CartPizza,
  Ingredient,
  PizzaIngredient,
  Pastry,
  PizzaSizePrice,
  PizzaSize,
  PastryPizza,
  Order,
  UserRole,
  Role,
  Token
}