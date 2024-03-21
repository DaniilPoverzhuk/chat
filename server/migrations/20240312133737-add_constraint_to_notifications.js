"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "Notifications",
          {
            type: "foreign key",
            fields: ["sender_id"],
            onDelete: "cascade",
            references: {
              table: "Users",
              field: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.addConstraint(
          "Notifications",
          {
            type: "foreign key",
            fields: ["getter_id"],
            onDelete: "cascade",
            references: {
              table: "Users",
              field: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint(
          "Notifications",
          "Notifications_getter_id_Users_fk",
          { transaction: t }
        ),
        queryInterface.removeConstraint(
          "Notifications",
          "Notifications_sender_id_Users_fk",
          { transaction: t }
        ),
      ]);
    });
  },
};
