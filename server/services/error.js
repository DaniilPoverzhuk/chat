import { validationResult } from "express-validator";

import ApiError from "../error/errorHandler.js";

export const checkError = (req) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new ApiError().BadRequest("Ошибка при валидации данных", result.array());
  }
};
