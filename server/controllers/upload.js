class UploadController {
  avatar(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError().BadRequest(
          "При загрузке изображение произошла ошибка"
        );
      }

      const src = `uploads/avatars/${req.file.originalname}`;

      return res.status(200).json({
        message: "Изображение было успешно загружено",
        src,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UploadController();
