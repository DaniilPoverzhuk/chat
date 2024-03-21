const { body } = require("express-validator");

exports.get = () => [
  body("email")
    .exists()
    .withMessage("Required field")
    .isEmail()
    .withMessage("this field should be email"),
];

exports.getNonFriends = () => [
  body("id").isNumeric().withMessage("Обязательное поле"),
  body("limit").isNumeric().withMessage("Обязательное поле"),
  body("page").isNumeric().withMessage("Обязательное поле"),
];
