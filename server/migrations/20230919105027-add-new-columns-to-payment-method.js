'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('payment_methods', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('payment_methods', 'type', {
      type: Sequelize.ENUM('card', 'paypal', 'googlepay', 'amex', 'applepay'),
      allowNull: false,
    });

    await queryInterface.addColumn('payment_methods', 'cardNumber', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('payment_methods', 'expirationMonth', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('payment_methods', 'expirationYear', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('payment_methods', 'paypalEmail', {
      type: Sequelize.STRING,
    });

  },

  async down(queryInterface, Sequelize) {
    // Remove the columns added in the up function
    await queryInterface.removeColumn('payment_methods', 'type');
    await queryInterface.removeColumn('payment_methods', 'userId');
    await queryInterface.removeColumn('payment_methods', 'cardNumber');
    await queryInterface.removeColumn('payment_methods', 'expirationMonth');
    await queryInterface.removeColumn('payment_methods', 'expirationYear');
    await queryInterface.removeColumn('payment_methods', 'paypalEmail');
    // Remove other columns as needed
  }
};
