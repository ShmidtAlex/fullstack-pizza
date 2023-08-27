const Router = require('express');
const router = new Router();
const uploadsController = require("../controllers/UploadController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), uploadsController.uploadPhoto);
router.get('/:imageName', uploadsController.getPreUploaded)
module.exports = router;
