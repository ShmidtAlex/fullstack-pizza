const Router = require('express');
const router = new Router();
const sizeController = require('../controllers/SizeController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware(['SUPERADMIN','ADMIN', 'REDACTOR']), sizeController.createSize);

router.get('/:id', sizeController.getSize);
router.delete('/:id', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), sizeController.removeSize);
router.patch('/:id', checkRoleMiddleware(['SUPERADMIN', 'ADMIN', 'REDACTOR']), sizeController.updateSize)

router.get('/', sizeController.getAllSizes);

module.exports = router
