'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    // Step 1: Create a new column with the desired data type
    await queryInterface.addColumn('user_accounts', 'newUserId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    // Step 2: Copy data from 'userId' to 'newUserId'
    await queryInterface.sequelize.query(`
      UPDATE "user_accounts"
      SET "newUserId" = CAST("userId" AS INTEGER);
    `);

    // Step 3: Remove the old 'userId' column
    await queryInterface.removeColumn('user_accounts', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    // In the down function, you can revert the changes if needed.
    // You'll need to perform the reverse operations.

    // Step 1: Add back the 'userId' column with the original data type
    await queryInterface.addColumn('user_accounts', 'userId', {
      type: Sequelize.STRING, // Use the original data type
      allowNull: false, // Modify other options as needed
    });

    // Step 2: Copy data from 'newUserId' to 'userId'
    await queryInterface.sequelize.query(`
      UPDATE "user_accounts"
      SET "userId" = CAST("newUserId" AS STRING);
    `);

    // Step 3: Remove the 'newUserId' column
    await queryInterface.removeColumn('user_accounts', 'newUserId');
  },
};
