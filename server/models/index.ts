const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
})
const Pizza = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
})
const Size = sequelize.define('Size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.INTEGER
  }
})
const Price = sequelize.define('Price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})
Price.belongsTo(Pizza);
Price.belongsTo(Size);
Pizza.hasMany(Price);
Size.hasMany(Price);

// Todo: finish relations between User => Cart, Cart => Pizza, Pizza => Nutrition, Pizza => Pastry
module.exports = {
  Pizza, Size, Price, User
}