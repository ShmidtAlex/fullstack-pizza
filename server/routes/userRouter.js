const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController')

router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/auth', userController.checkIsAuth);
router.get('/', userController.getAllUsers);
router.delete('/delete', userController.deleteUser)

module.exports = router
