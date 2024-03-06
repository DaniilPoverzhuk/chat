"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "Friends",
          {
            type: "foreign key",
            fields: ["user_id"],
            onDelete: "cascade",
            references: {
              table: "Users",
              field: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.addConstraint(
          "Friends",
          {
            type: "foreign key",
            fields: ["friend_id"],
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
          "Friends",
          {
            type: "foreign key",
            fields: ["user_id"],
            onDelete: "cascade",
            references: {
              table: "Users",
              field: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.removeConstraint(
          "Friends",
          {
            type: "foreign key",
            fields: ["friend_id"],
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
};
