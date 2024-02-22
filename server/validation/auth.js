const { body } = require("express-validator");

exports.login = () => [
  body("email").isEmail().withMessage("Невалидная почта"),
  body("password")
    .isString()
    .withMessage("Неверный тип данных, должна быть строка")
    .isLength({ min: 5 })
    .withMessage("Пароль должен состоять минимум из 5 символов"),
];

exports.registration = () => [
  body("email").isEmail().withMessage("Невалидная почта"),
  body("username")
    .isString()
    .withMessage("Неверный тип данных, должна быть строка")
    .isLength({ min: 3 })
    .withMessage("Имя должно состоять минимум из 3 символов"),
  body("password")
    .isString()
    .withMessage("Неверный тип данных, должна быть строка")
    .isLength({ min: 5 })
    .withMessage("Пароль должен состоять минимум из 5 символов"),
  body("avatar").optional().isString().withMessage("Невалидный URL"),
];

exports.me = () => [body("email").isEmail().withMessage("Невалидная почта")];
