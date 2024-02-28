const { body } = require("express-validator");

exports.image = () => [body("src").isString().withMessage("Обязательное поле")];
