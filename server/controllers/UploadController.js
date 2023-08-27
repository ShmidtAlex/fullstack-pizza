const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs/promises');

class UploadsController {
  async uploadPhoto(req, res, next) {
    try {
      console.log('FILES', req.files)
      if (!req.files) {
        return next(ApiError.badRequest('No file uploaded.'));
      }


    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
  
  async getPreUploaded(req, res, next) {
    const imageName = req.params.imageName; // Extract the image name from the URL
    console.log('1', imageName)
    const imagePath = path.join(__dirname, '../uploads', imageName);
    console.log(imagePath)
    try {
      // Read the image file as binary data
      const imageDataBuffer = await fs.readFile(imagePath);

      // Convert the buffer to base64-encoded string
      const imageData = imageDataBuffer.toString('base64');
      console.log('IMAGEDATA', imageData)
      // Send the image data in the response
      res.status(200);
      res.send(imageData); // Send the base64-encoded image data directly
    } catch (error) {
      return next(ApiError.notFound('Image not found.'));
    }
  }
}

module.exports = new UploadsController()