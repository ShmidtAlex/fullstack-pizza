const ApiError = require('../error/ApiError')
const { UserAccount, UserPaymentMethod, UserDeliveryAddress } = require('../models')
const {DataTypes} = require("sequelize");

class AccountController {
  async createPaymentMethod(req, res, next) {
    try {
      const { userId } = req.params
      const { name, type, cardNumber, expirationMonth, expirationYear, paypalEmail } = req.body
      // Todo: it's not clear does it make sense to keep payment data for google pay and apple pay
      const paymentTypeFields = {
        appId: { type: 'appId' },
        card: { type, cardNumber, expirationMonth, expirationYear },
        paypal: { type, paypalEmail },
        apple: { type },
        googleId: { type },
        amex: { type }
      };
      await UserPaymentMethod.create({
        userId,
        name,
        ...paymentTypeFields[type],
      });

      return res.json({ message: `Payment method ${ type } created successfully` });
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during updating personal account data: ${error.message}`));
    }
  }
  async createDeliveryAddress(req, res, next) {
    try {
      // todo: add method's content for updating user's personal data
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during updating personal account data: ${error.message}`));
    }
  }
  async deletePaymentMethod(req, res, next) {

  }
  async deleteAddressMethod(req, res, next) {

  }
  async getAccountData(req, res, next) {
    try {

    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during request personal account data: ${error.message}`));
    }
  }
}

module.exports = new AccountController()