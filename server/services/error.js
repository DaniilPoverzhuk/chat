const { validationResult } = require("express-validator");
const ApiError = require("../error/errorHandler.js");

exports.check = (req) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new ApiError().BadRequest("Ошибка при валидации данных", result.array());
  }
};
