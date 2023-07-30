const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleWare')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkIsAuth);
router.get('/', userController.getAllUsers);
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), userController.deleteUser)
router.patch('/delete/:id', userController.updateUser)

module.exports = router
