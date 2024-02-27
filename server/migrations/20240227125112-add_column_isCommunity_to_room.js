"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Rooms", "isCommunity", DataTypes.BOOLEAN);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Rooms", "isCommunity", DataTypes.BOOLEAN);
  },
};
