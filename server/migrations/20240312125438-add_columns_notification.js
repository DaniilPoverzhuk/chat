"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Notifications",
          "sender_id",
          {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Notifications",
          "getter_id",
          {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Notifications", "sender_id", {
          transaction: t,
        }),
        queryInterface.removeColumn("Notifications", "getter_id", {
          transaction: t,
        }),
        // queryInterface.removeConstraint(
        //   "Notifications",
        //   "Notifications_sender_id_Users_fk",
        //   {
        //     transaction: t,
        //   }
        // ),
        // queryInterface.removeConstraint(
        //   "Notifications",
        //   "Notifications_getter_id_Users_fk",
        //   {
        //     transaction: t,
        //   }
        // ),
      ]);
    });
  },
};
