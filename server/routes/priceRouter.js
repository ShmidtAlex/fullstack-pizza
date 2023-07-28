const Router = require('express');
const router = new Router();
const priceController = require('../controllers/PriceController')

router.post('/', priceController.createPrice);
router.delete('/', priceController.removePrice);
router.get('/:id', priceController.getPrice);
router.get('/', priceController.getAllPrices); // for management only ?

module.exports = router

// Todo: There should be only patches for existed prices