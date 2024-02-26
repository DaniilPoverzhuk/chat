"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Rooms", "name", DataTypes.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Rooms", "name", DataTypes.STRING);
  },
};
