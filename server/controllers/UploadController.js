const ApiError = require('../error/ApiError');
class UploadsController {
  async uploadPhoto(req, res, next) {
    console.log('CONTROLLER', req.body, req.files)
    try {
      if (!req.file) {
        return next(ApiError.badRequest('No file uploaded.'));
      }

      const imageUrl = req.file.filename; // Use the generated filename or customize as needed

      return res.json({ imageUrl });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UploadsController()