const { body } = require("express-validator");

exports.get = () => [
  body("senderId").isNumeric().withMessage("Обязательное поле"),
  body("getterId").isNumeric().withMessage("Обязательное поле"),
];
