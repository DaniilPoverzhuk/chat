"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "friends", DataTypes.JSON);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "friends", DataTypes.JSON);
  },
};
