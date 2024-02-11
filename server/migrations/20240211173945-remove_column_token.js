"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Tokens", "accessToken");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("Tokens", "accessToken", Sequelize.TEXT);
  },
};
