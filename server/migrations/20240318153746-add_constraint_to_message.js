"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("Messages", {
      type: "foreign key",
      onDelete: "cascade",
      fields: ["room_id"],
      references: {
        table: "Rooms",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Messages", {
      type: "foreign key",
      onDelete: "cascade",
      fields: ["room_id"],
      references: {
        table: "Rooms",
        field: "id",
      },
    });
  },
};
