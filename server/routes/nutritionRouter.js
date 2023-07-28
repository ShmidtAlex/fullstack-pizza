const Router = require('express');
const router = new Router();
const nutritionController = require('../controllers/nutritionController')

router.post('/', nutritionController.createNutrition);
router.delete('/', nutritionController.removeNutrition);
router.get('/:id', nutritionController.getNutrition);
router.get('/', nutritionController.getAllNutritionItems);

module.exports = router

// TOdo: maybe better to delete