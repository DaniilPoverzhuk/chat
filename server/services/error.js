const { validationResult } = require("express-validator");
const ApiError = require("../error/errorHandler.js");

exports.checkError = (req) => {
  const result = validationResult(req);

  console.log(result.array());

  if (!result.isEmpty()) {
    throw new ApiError().BadRequest("Ошибка при валидации данных", result.array());
  }
};
