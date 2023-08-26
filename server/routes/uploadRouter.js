// uploadRouter.js
const Router = require('express');
const router = new Router();
const uploadsController = require("../controllers/UploadController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware")

router.post('/', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), multerMiddleware, uploadsController.uploadPhoto);

module.exports = router;
