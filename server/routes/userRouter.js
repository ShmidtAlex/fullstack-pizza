const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleWare')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
// validate the body of request
const { body } = require('express-validator')

router.get('/activate/:link', userController.activate);
router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/auth', authMiddleware, userController.checkIsAuth);
router.get('/refresh', userController.refresh);
router.get('/users', checkRoleMiddleware(['SUPERADMIN']), userController.getAllUsers);
router.delete('/delete/:id', checkRoleMiddleware(['SUPERADMIN']), userController.deleteUser);
router.patch('/update/:id', checkRoleMiddleware(['SUPERADMIN']), userController.updateUser);
// Todo: seems like we need another route to readact users' data by themselves. I mean phones, emails and etc.
module.exports = router
