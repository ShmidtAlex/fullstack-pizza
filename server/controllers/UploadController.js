const ApiError = require('../error/ApiError');
const multer = require('multer')
const stream = require('stream');
class UploadsController {
  filename(_req, file, cb) {
    console.log('file will be named ' + file.originalname);
    cb(null, file.originalname);
  }
  async uploadPhoto(req, res, next) {
    // Todo: move multer into separate middleware (in order to keep controller thin)?
    const storage = multer.diskStorage({
      destination: 'uploads/',
      filename: (_req, file, cb) => {
        cb(null, file.name);
      }
    });
    try {
      if (!req.files.image) {
        return next(ApiError.badRequest('No file uploaded.'));
      }
      storage._handleFile(
        req, {
          ...req.files.image,
          stream: new stream.PassThrough(),
        },
        (err) => {
          if (err) {
            console.log('Upload failed with error: ' + err.message);
            res.status(422);
            res.json(err.message);
            res.end();
          }
        }
      );
      res.status(200);
      res.json('OK');
      res.end();
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UploadsController()