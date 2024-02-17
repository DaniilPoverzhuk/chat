const { body } = require("express-validator");

exports.send = () => [
  body("senderId").isNumeric().withMessage("Обязательное поле"),
  body("value").isString().withMessage("Обязательное поле"),
  body("roomId").isNumeric().withMessage("Обязательное поле"),
];
