const Router = require('express');
const router = new Router();
const sizeController = require('../controllers/sizeController')

router.post('/', sizeController.createSize);
router.delete('/', sizeController.removeSize);
router.get('/:id', sizeController.getSize);
router.get('/', sizeController.getAllSizes);
module.exports = router

// Todo: There should be only patches for existed sizes or delete it