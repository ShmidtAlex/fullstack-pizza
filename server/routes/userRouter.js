const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleWare')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkIsAuth);
router.get('/', userController.getAllUsers);
router.delete('/delete',userController.deleteUser)

module.exports = router
