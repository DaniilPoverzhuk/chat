class ApiErorr extends Error {
  constructor(message, status, errors = []) {
    super(message);

    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  UnauthorizedError() {
    return new ApiErorr("Пользователь не авторизован", 401);
  }

  BadRequest(message, errors = []) {
    return new ApiErorr(message, 400, errors);
  }
}

export default ApiErorr;
