const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const ingredientRouter = require('./ingredientRouter');
const nutritionRouter = require('./nutritionRouter');
const pizzaRouter = require('./pizzaRouter');
const priceRouter = require('./priceRouter');
const sizeRouter = require('./sizeRouter');
const uploadRouter = require('./uploadRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/ingredients', ingredientRouter);
router.use('/nutrition', nutritionRouter);
router.use('/pizza', pizzaRouter);
router.use('/price', priceRouter);
router.use('/size', sizeRouter);
router.use('/upload', uploadRouter);
module.exports = router
