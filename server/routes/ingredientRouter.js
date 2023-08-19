const Router = require('express');
const router = new Router();
const ingredientController = require('../controllers/IngredientController')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), ingredientController.createIngredient);
router.delete('/:id', checkRoleMiddleware(['SUPERADMIN','ADMIN']), ingredientController.removeIngredient);
router.patch('/:id', checkRoleMiddleware(['SUPERADMIN', 'ADMIN', 'REDACTOR']), ingredientController.updateIngredient);
router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredient);

module.exports = router

// Todo: There should be only patches for existed ingredients