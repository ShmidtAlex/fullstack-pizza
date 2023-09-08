const Router = require('express');
const router = new Router();
const uploadsController = require("../controllers/UploadController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), uploadsController.uploadPhoto);
router.get('/uploads/:fileName', uploadsController.downloadPreloadedPhoto);
router.get('/static/:fileName', uploadsController.downloadPhoto);

router.delete('/:fileName', uploadsController.removePhoto)
module.exports = router;
