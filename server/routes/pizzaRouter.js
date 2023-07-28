const Router = require('express');
const router = new Router();
const pizzaController = require('../controllers/PizzaController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), pizzaController.createPizza);
router.delete('/', checkRoleMiddleware('ADMIN'), pizzaController.removePizza);
router.get('/:id', pizzaController.getPizza); // there are concerns if we really need it, rather for item management
router.get('/', pizzaController.getAllPizzas);

module.exports = router
