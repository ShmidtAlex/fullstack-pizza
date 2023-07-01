const Router = require('express');
const router = new Router();
const pizzaController = require('../controllers/PizzaController');

router.post('/', pizzaController.createPizza);
router.delete('/', pizzaController.removePizza);
router.get('/:id', pizzaController.getPizza); // there are concerns if we really need it, rather for item management
router.get('/', pizzaController.getAllPizzas);

module.exports = router
