const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs/promises');
const mime = require('mime');
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

        // Return the URL of the uploaded image to the client
        res.json({ imageUrl: image.name });
      });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  // async getPreUploaded(req, res, next) {
  //   const imageName = req.params.imageName;
  //
  //
  //   const imagePath = path.join(__dirname, '../uploads', imageName);
  //
  //   try {
  //     const imageDataBuffer = await fs.readFile(imagePath);
  //     const mimeType = mime.getType(imagePath);
  //     res.setHeader('Content-Type', mimeType);
  //     res.status(200).send(imageDataBuffer);
  //   } catch (error) {
  //     return next(ApiError.notFound('Image not found.'));
  //   }
  // }
}

module.exports = new UploadsController()