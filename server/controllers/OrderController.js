// controllers/OrderController.js

const { Order, Cart, User } = require("../models");
const ApiError = require('../error/ApiError');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { cartId, totalPrice } = req.body;

      // Create a new order for the user's cart
      const order = await Order.create({ totalPrice });

      // Associate the order with the user's cart
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return next(ApiError.notFound('Cart not found'));
      }

      cart.setOrder(order);

      // Update the cart's status to 'ordered' (optional, if you want to track cart status)
      cart.status = 'ordered';
      await cart.save();

      res.json(order);
    } catch (error) {
      next(ApiError.internalServerError(error.message));
    }
  }

  async getOrderHistory(req, res, next) {
    try {
      const { userId } = req.params;

      // Find all orders associated with the user
      const user = await User.findByPk(userId, {
        include: {
          model: Cart,
          include: { model: Order, include: { all: true } }
        },
      });

      if (!user) {
        return next(ApiError.notFound('DUser not found'));
      }

      res.json(user.carts.map(cart => cart.orders));
    } catch (error) {
      next(ApiError.internalServerError(error.message));
    }
  }
}

module.exports = new OrderController();
