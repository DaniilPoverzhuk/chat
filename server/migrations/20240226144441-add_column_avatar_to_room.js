"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Rooms", "avatar", DataTypes.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Rooms", "avatar", DataTypes.STRING);
  },
};
