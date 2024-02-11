"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Tokens", "userId", Sequelize.INTEGER);
  },

  async down(queryInterface, _) {
    return queryInterface.removeColumn("Tokens", "userId");
  },
};
