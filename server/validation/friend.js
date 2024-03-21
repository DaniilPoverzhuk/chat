const { body } = require("express-validator");

exports.getAll = () => [
  body("id")
    .exists()
    .withMessage("Required field")
    .isNumeric()
    .withMessage("the field type is incorrect, there must be a number"),
];

exports.add = () => [
  body("user_id")
    .exists()
    .withMessage("Required field")
    .isNumeric()
    .withMessage("the field type is incorrect, there must be a number"),
  body("friend_id")
    .exists()
    .withMessage("Required field")
    .isNumeric()
    .withMessage("the field type is incorrect, there must be a number"),
];

exports.sendFriendRequest = () => [
  body("sender_id").isNumeric().withMessage("Обязательное поле"),
  body("getter_id").isNumeric().withMessage("Обязательное поле"),
];

exports.getFriendRequest = () => [
  body("id").isNumeric().withMessage("Обязательное поле"),
  body("orderBy").isString().withMessage("Обязательное поле"),
];
