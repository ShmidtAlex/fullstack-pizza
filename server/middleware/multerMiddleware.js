const multer = require('multer');

const upload = multer({ dest: "uploads", limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Define and export the middleware function
const multerMiddleware = (req, res, next) => {
  console.log('FILES', req.files)
  upload.single('image')(req, res, (err) => {
    console.log('FILES_2', req.files)
    if (err) {
      // Handle the multer error, if any
      console.log(err.message)
      return res.status(400).json({ error: 'File upload error' });
    }
    next(); // Proceed to the next middleware
  });
};

module.exports = multerMiddleware;