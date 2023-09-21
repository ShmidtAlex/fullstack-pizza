'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('user_accounts', 'newUserId', 'userId');
  },

  async down(queryInterface, Sequelize) {
    // Reverse the renaming and add the original userId column back
    await queryInterface.renameColumn('user_accounts', 'userId', 'newUserId');
  }
};
