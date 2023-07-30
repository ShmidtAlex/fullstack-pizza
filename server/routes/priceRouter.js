const Router = require('express');
const router = new Router();
const priceController = require('../controllers/PriceController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware(['ADMIN']), priceController.createPrice);

router.get('/:id', priceController.getPrice);
router.delete('/:id', checkRoleMiddleware(['ADMIN']), priceController.removePrice);
router.patch('/:id', checkRoleMiddleware(['ADMIN', 'REDACTOR']), priceController.updatePrice)

router.get('/', priceController.getAllPrices); // for management only ?

module.exports = router
