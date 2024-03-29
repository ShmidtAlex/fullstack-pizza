const Router = require('express');
const router = new Router();
const pizzaController = require('../controllers/PizzaController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), pizzaController.createPizza);

router.get('/:id', pizzaController.getPizza); // there are concerns if we really need it, rather for item management
router.delete('/:id', checkRoleMiddleware(['SUPERADMIN', 'ADMIN']), pizzaController.removePizza);
router.patch('/:id', checkRoleMiddleware(['ADMIN', 'REDACTOR']), pizzaController.updatePizza);

router.get('/', pizzaController.getAllPizzas);

module.exports = router
