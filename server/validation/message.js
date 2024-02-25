const { body } = require("express-validator");

exports.save = () => [
  body("senderId").isNumeric().withMessage("Обязательное поле"),
  body("value").isString().withMessage("Обязательное поле"),
  body("roomId").isNumeric().withMessage("Обязательное поле"),
];

exports.getAll = () => [body("roomId").isNumeric().withMessage("Обязательное поле")];

exports.getLast = () => [
  body("senderId").isNumeric().withMessage("Обязательное поле"),
  body("getterId").isNumeric().withMessage("Обязательное поле"),
];
