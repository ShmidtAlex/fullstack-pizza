'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the UserAccount table
    await queryInterface.changeColumn('user_accounts', 'img', {
      type: DataTypes.STRING,
      allowNull: true, // Allow img to be nullable
    });

    await queryInterface.changeColumn('user_accounts', 'firstName', {
      type: DataTypes.STRING,
      allowNull: true, // Allow firstName to be nullable
    });

    await queryInterface.changeColumn('user_accounts', 'lastName', {
      type: DataTypes.STRING,
      allowNull: true, // Allow lastName to be nullable
    });

    await queryInterface.changeColumn('user_accounts', 'contactPhone', {
      type: DataTypes.STRING,
      allowNull: true, // Allow contactPhone to be nullable
    });

    // Repeat the above code for other fields in the UserAccount table

    // Modify the UserDeliveryAddress table
    await queryInterface.changeColumn('delivery_addresses', 'city', {
      type: DataTypes.STRING,
      allowNull: true, // Allow city to be nullable
    });

    await queryInterface.changeColumn('delivery_addresses', 'street', {
      type: DataTypes.STRING,
      allowNull: true, // Allow street to be nullable
    });

    await queryInterface.changeColumn('delivery_addresses', 'building', {
      type: DataTypes.STRING,
      allowNull: true, // Allow building to be nullable
    });

    await queryInterface.changeColumn('delivery_addresses', 'apartments', {
      type: DataTypes.STRING,
      allowNull: true, // Allow apartments to be nullable
    });

    // Repeat the above code for other fields in the UserDeliveryAddress table

    // Modify the UserPaymentMethod table
    await queryInterface.changeColumn('payment_methods', 'name', {
      type: DataTypes.STRING,
      allowNull: true, // Allow name to be nullable
    });

    await queryInterface.changeColumn('payment_methods', 'type', {
      type: DataTypes.ENUM('card', 'paypal', 'googlepay', 'amex', 'applepay'),
      allowNull: true, // Allow type to be nullable
    });

    await queryInterface.changeColumn('payment_methods', 'cardNumber', {
      type: DataTypes.STRING,
      allowNull: true, // Allow cardNumber to be nullable
    });

    await queryInterface.changeColumn('payment_methods', 'expirationMonth', {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow expirationMonth to be nullable
    });

    await queryInterface.changeColumn('payment_methods', 'expirationYear', {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow expirationYear to be nullable
    });

    await queryInterface.changeColumn('payment_methods', 'paypalEmail', {
      type: DataTypes.STRING,
      allowNull: true, // Allow paypalEmail to be nullable
    });

    // Repeat the above code for other fields in the UserPaymentMethod table
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes for UserAccount table
    await queryInterface.changeColumn('user_accounts', 'img', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('user_accounts', 'firstName', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('user_accounts', 'lastName', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('user_accounts', 'contactPhone', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    // Repeat the above code for other fields in the UserAccount table

    // Revert changes for UserDeliveryAddress table
    await queryInterface.changeColumn('delivery_addresses', 'city', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('delivery_addresses', 'street', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('delivery_addresses', 'building', {
      type: DataTypes.STRING,
      allowNull: true, 
    });

    await queryInterface.changeColumn('delivery_addresses', 'apartments', {
      type: DataTypes.STRING,
      allowNull: true, 
    });

    // Repeat the above code for other fields in the UserDeliveryAddress table

    // Revert changes for UserPaymentMethod table
    await queryInterface.changeColumn('payment_methods', 'name', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('payment_methods', 'type', {
      type: DataTypes.ENUM('card', 'paypal', 'googlepay', 'amex', 'applepay'),
      allowNull: false, 
    });

    await queryInterface.changeColumn('payment_methods', 'cardNumber', {
      type: DataTypes.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('payment_methods', 'expirationMonth', {
      type: DataTypes.INTEGER,
      allowNull: false, 
    });

    await queryInterface.changeColumn('payment_methods', 'expirationYear', {
      type: DataTypes.INTEGER,
      allowNull: false, 
    });

    await queryInterface.changeColumn('payment_methods', 'paypalEmail', {
      type: Sequelize.STRING,
      allowNull: false, 
    });

    // Repeat the above code for other fields in the UserPaymentMethod table
  },

};
