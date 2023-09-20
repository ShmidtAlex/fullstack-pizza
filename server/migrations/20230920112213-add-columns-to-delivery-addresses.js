'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'city' column
    await queryInterface.addColumn('delivery_addresses', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Add the 'street' column
    await queryInterface.addColumn('delivery_addresses', 'street', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Add the 'building' column
    await queryInterface.addColumn('delivery_addresses', 'building', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add the 'apartments' column
    await queryInterface.addColumn('delivery_addresses', 'apartments', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('delivery_addresses', 'city');
    await queryInterface.removeColumn('delivery_addresses', 'street');
    await queryInterface.removeColumn('delivery_addresses', 'building');
    await queryInterface.removeColumn('delivery_addresses', 'apartments');
  }
};
