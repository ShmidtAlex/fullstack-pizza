const ApiError = require('../error/ApiError');
const path = require('path');

class UploadsController {
  async uploadPhoto(req, res, next) {
    try {
      if (!req.files) {
        return next(ApiError.badRequest('No file uploaded.'));
      }
      const image = req.files.image
      let tempPath = path.join(__dirname, '../uploads/', image.name);
      await image.mv(tempPath, function(err) {
        if (err) {
          return res.status(500).send(err);
        }

        res.json({ imageUrl: image.name });
      });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UploadsController()