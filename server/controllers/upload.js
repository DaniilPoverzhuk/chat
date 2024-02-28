const ApiError = require("../error/errorHandler");

class UploadController {
  async image(req, res, next) {
    try {
      console.log(req.file);
      if (!req.file) {
        throw new ApiError().BadRequest("При загрузке изображение произошла ошибка");
      }
      const src = `uploads/images/${req.file.originalname}`;

      return res.status(200).json({
        message: "Image has been uploaded successfully",
        src,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UploadController();
