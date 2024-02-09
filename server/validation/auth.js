import { body } from "express-validator";

export const login = () => [
  body("email").isEmail().withMessage("Невалидная почта"),
  body("username").isString().exists(),
  body("password").isString().exists(),
];

export const registration = () => [
  body("email").isEmail().withMessage("Невалидная почта"),
  body("username").isString().withMessage("Обязательное поле"),
  // body("password").isString().exists().isLength({ min: 5 }),
  // body("avatar").optional().isURL().withMessage("Невалидный URL"),
];
