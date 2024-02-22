const ApiError = require("../error/errorHandler.js");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      error: err.error,
    });
  }

  return res.status(500).json({
    message: "Непредвиденная ошибка",
  });
};
