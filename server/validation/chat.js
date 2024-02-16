const { body } = require("express-validator");

exports.getChat = () => [
  body("senderId").isString().withMessage("Обязательное поле"),
  body("getterId").isString().withMessage("Обязательное поле"),
];
