const Router = require('express');
const router = new Router();
const sizeController = require('../controllers/sizeController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware('ADMIN'), sizeController.createSize);

router.get('/:id', sizeController.getSize);
router.delete('/:id', checkRoleMiddleware('ADMIN'), sizeController.removeSize);
router.patch('/:id', checkRoleMiddleware(['ADMIN', 'REDACTOR']), sizeController.updateSize)

router.get('/', sizeController.getAllSizes);

module.exports = router
