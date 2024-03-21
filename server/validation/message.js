const { body } = require("express-validator");

exports.getAll = () => [
  body("room_id").isNumeric().withMessage("Обязательное поле"),
];

exports.save = () => [
  body("room_id").isNumeric().withMessage("Обязательное поле"),
  body("sender_id").isNumeric().withMessage("Обязательное поле"),
  body("value").isString().withMessage("Обязательное поле"),
];
