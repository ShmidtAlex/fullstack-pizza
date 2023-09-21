const Router = require('express');
const router = new Router();
const accountController = require("../controllers/accountController");
const authMiddleware = require('../middleware/authMiddleWare')

router.get('/:userId', accountController.getAccountData);
router.post('/create', accountController.createUserAccount);
// as theoretically we could add many addresses and payment methods, we should prevent DDOS addition by checking user authorization
router.post('/update', authMiddleware, accountController.createUserAccount);
router.post('/address/:userId', authMiddleware, accountController.createDeliveryAddress);
router.post('/payment-method/:userId', authMiddleware, accountController.createPaymentMethod);
// and the same for deletion
router.delete('/delete/payment-method/:userId/method/:methodId', authMiddleware, accountController.deletePaymentMethod);
router.delete('/delete/address/:userId/address/:addressId', authMiddleware, accountController.deleteAddress);
router.delete('/delete/avatar/:userId', authMiddleware, accountController.removeAvatar)
module.exports = router