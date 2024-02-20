const { body } = require("express-validator");

exports.getAll = () => [body("email").isEmail().withMessage("Невалидный email")];

exports.getAllOnline = () => [body("email").isEmail().withMessage("Невалидный email")];

exports.changeStatus = () => [body("userId").isNumeric().withMessage("Обязательное поле")];
