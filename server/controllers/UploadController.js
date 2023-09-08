const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs');

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
      return next(ApiError.internalServerError(e.message));
    }
  }
  async downloadPreloadedPhoto(req, res, next) {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../uploads/', fileName);
    if (!filePath) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  }
  async downloadPhoto(req, res, next) {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../static/', fileName);
    if (!filePath) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  }
  async removePhoto(req, res, next) {
    try {
      const { fileName } = req.params;
      const filePath = path.join(__dirname, '../uploads', fileName)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        res.json({ message: 'Preloaded file deleted successfully' })
      } else {
        return next(ApiError.notFound('File not found'))
      }
    } catch (e) {
      return next(ApiError.internalServerError('Deleting file error'))
    }
  }
}

module.exports = new UploadsController()