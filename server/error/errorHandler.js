module.exports = class ApiError extends Error {
  constructor(message, status, error = []) {
    super(message);

    this.message = message;
    this.status = status;
    this.error = error;
  }

  UnauthorizedError() {
    return new ApiError("Пользователь не авторизован", 401);
  }

  BadRequest(message, error = []) {
    return new ApiError(message, 400, error);
  }
};
