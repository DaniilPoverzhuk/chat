"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friend_Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friend_Requests.init(
    {
      sender_id: DataTypes.INTEGER,
      getter_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Friend_Requests",
    }
  );
  return Friend_Requests;
};
