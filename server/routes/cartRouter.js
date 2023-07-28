const Router = require('express');
const router = new Router();
const cartController = require('../controllers/CartController')

router.post('/', cartController.createCart);
router.delete('/', cartController.removeCart);
router.get('/:id', cartController.getCart); // ??????

module.exports = router

// Todo: There should be only methods to get statistics