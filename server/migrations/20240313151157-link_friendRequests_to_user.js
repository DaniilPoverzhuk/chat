"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "Friend_Requests",
          {
            fields: ["user_id"],
            type: "foreign key",
            onDelete: "cascade",
            references: {
              table: "Users",
              field: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.addConstraint(
          "Friend_Requests",
          {
            fields: ["friend_id"],
            type: "foreign key",
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
