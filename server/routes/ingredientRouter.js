const Router = require('express');
const router = new Router();
const ingredientController = require('../controllers/ingredientController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware('ADMIN'), ingredientController.createIngredient);
router.delete('/:id', checkRoleMiddleware('ADMIN'), ingredientController.removeIngredient);
router.patch('/:id', checkRoleMiddleware(['ADMIN', 'REDACTOR']), ingredientController.updateIngredient);
router.get('/', ingredientController.getAllIngredients)
router.get('/:id', ingredientController.getIngredient);

module.exports = router

// Todo: There should be only patches for existed ingredients