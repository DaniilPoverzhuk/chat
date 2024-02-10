module.exports = class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message);

    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  UnauthorizedError() {
    return new ApiError("Пользователь не авторизован", 401);
  }

  BadRequest(message, errors = []) {
    return new ApiError(message, 400, errors);
  }
};
