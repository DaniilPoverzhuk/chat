"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Rooms",
          "avatar",
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Rooms",
          "name",
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Rooms",
          "avatar",
          {
            type: DataTypes.STRING,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Rooms",
          "name",
          {
            type: DataTypes.STRING,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
