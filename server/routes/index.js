const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const ingredientRouter = require('./ingredientRouter');
const nutritionRouter = require('./nutritionRouter');
const pizzaRouter = require('./pizzaRouter');
const priceRouter = require('./priceRouter');
const sizeRouter = require('./sizeRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/ingredient', ingredientRouter);
router.use('/nutrition', nutritionRouter);
router.use('/pizza', pizzaRouter);
router.use('/price', priceRouter);
router.use('/size', sizeRouter);

module.exports = router
