const { body } = require("express-validator");

exports.get = () => [
  body("senderId").isString().withMessage("Обязательное поле"),
  body("getterId").isString().withMessage("Обязательное поле"),
];
