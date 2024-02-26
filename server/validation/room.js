const { body } = require("express-validator");

exports.get = () => [
  body("senderId").isNumeric().withMessage("Обязательное поле"),
  body("getterId").isNumeric().withMessage("Обязательное поле"),
];

exports.getById = () => body("roomId").isNumeric().withMessage("Обязательное поле");

exports.createGroup = () => [
  body("name").isString().withMessage("Обязательное поле"),
  body("avatar").isString().optional(),
  body("users").isJSON().optional(),
];
