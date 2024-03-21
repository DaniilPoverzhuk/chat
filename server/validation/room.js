const { body } = require("express-validator");

exports.getAll = () => [
  body("id").isNumeric().withMessage("Обязательное поле"),
];

exports.create = () => [
  body("users").isArray().withMessage("Обязательное поле"),
  body("isCommunity").isBoolean().withMessage("Обязательное поле"),
  body("name").optional(),
  body("avatar").optional(),
];
