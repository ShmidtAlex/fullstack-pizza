const Router = require('express');
const router = new Router();
const accountController = require("../controllers/accountController");

router.get('/:userId', accountController.getAccountData);
router.post('/address/:userId', accountController.createDeliveryAddress);
router.post('/payment-method/:userId', accountController.createPaymentMethod);
router.delete('/delete/payment-method/:userId/method/:methodId', accountController.deletePaymentMethod);
router.delete('/delete/address/:userId/address/:addressId', accountController.deleteAddress);

module.exports = router