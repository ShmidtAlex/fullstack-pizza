const Router = require('express');
const router = new Router();
const ingredientController = require('../controllers/ingredientController')

router.post('/', ingredientController.createIngredient);
router.delete('/:id', ingredientController.removeIngredient);
router.get('/', ingredientController.getAllIngredients)
router.get('/:id', ingredientController.getIngredient);

module.exports = router
