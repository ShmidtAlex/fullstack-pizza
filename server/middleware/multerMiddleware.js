const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});
upload = multer({ storage: storage });
module.exports = upload