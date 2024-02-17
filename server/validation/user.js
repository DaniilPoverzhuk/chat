const { body } = require("express-validator");

exports.getAll = () => [body("email").isEmail().withMessage("Невалидный email")];
