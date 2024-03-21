"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.renameColumn("Friend_Requests", "user_id", "sender_id", {
          transaction: t,
        }),
        queryInterface.renameColumn(
          "Friend_Requests",
          "friend_id",
          "getter_id",
          {
            transaction: t,
          }
        ),
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.renameColumn("Friend_Requests", "sender_id", "user_id", {
          transaction: t,
        }),
        queryInterface.renameColumn(
          "Friend_Requests",
          "getter_id",
          "friend_id",
          {
            transaction: t,
          }
        ),
      ])
    );
  },
};
