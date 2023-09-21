'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_accounts', 'contactPhone', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null temporarily during migration
    });

    // Update existing rows to provide non-null values
    await queryInterface.sequelize.query(`
      UPDATE "user_accounts"
      SET "contactPhone" = 'some_default_value'
      WHERE "contactPhone" IS NULL;
    `);

    // Alter the column to non-null
    await queryInterface.changeColumn('user_accounts', 'contactPhone', {
      type: Sequelize.STRING,
      allowNull: false, // Set it to non-null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_accounts', 'contactPhone');
  }
};
