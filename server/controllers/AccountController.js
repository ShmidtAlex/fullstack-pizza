const ApiError = require('../error/ApiError')
const { UserAccount, UserPaymentMethod, UserDeliveryAddress } = require('../models')
const removeEntityService = require('../services/deleteService')
const uuid = require("uuid");
const path = require("path");

class AccountController {
  async createUserAccount(req, res, next) {
    try {
      const { img } = req.files
      const { userId } = req.params
      const { firstName, lastName, contactPhone } = req.body
      let fileName = `${uuid.v4()}.jpg`
      await img.mv(path.resolve(__dirname, '..', 'static/avatars', fileName))
      const existedAccount = await UserAccount.findOne({ where: { userId }})

      if (existedAccount) {
        // Todo: check if it works
        return next(ApiError.badRequest('Account for this user already exists'))
      }
      const account = await UserAccount.create({
        firstName, lastName, contactPhone, userId
      })
      return res.json(account)
    } catch(error) {
      return next(ApiError.internalServerError(`An error occurred during creating personal account data: ${error.message}`));
    }
  }
  async updateUserAccount(req, res, next) {
    try {
      const { id } = req.params
      const { firstName, lastName, contactPhone } = req.body
      const { img } = req.files
      const existedAccount = await UserAccount.findByPk(id)
      if (!existedAccount) {
        return next(ApiError.notFound('There is no account with such an id'));
      }
      const update = {}
      if (firstName) {
        update.firstName = firstName
      }
      if (lastName) {
        update.lastName = lastName
      }
      if (contactPhone) {
        update.contactPhone = contactPhone
      }
      if (img) {
        // todo: we should first find the existed file in order to remove it
        let fileName = `${uuid.v4()}.jpg`
        await img.mv(path.resolve(__dirname, '..', 'static/avatars', fileName))
        update.img = fileName
      }

      const renewedAccount  = await existedAccount.update(update, { where: { id } })
      return res.json(renewedAccount)

    } catch(error) {
      return next(ApiError.internalServerError(`An error occurred during updating personal account data: ${error.message}`));
    }
  }
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
      const paymentMethod = await UserPaymentMethod.create({
        userId,
        name,
        ...paymentTypeFields[type],
      });

      return res.json(paymentMethod);
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during creating payment method: ${error.message}`));
    }
  }
  async createDeliveryAddress(req, res, next) {
    try {
      const { userId } = req.params
      const { city, street, building, apartments } = req.body
      if (!city && !street) {
        return next(ApiError.badRequest('City and street are required fields'))
      }
      const address = await UserDeliveryAddress.create({
        userId, city, street, building, apartments
      })

      return res.json(address)
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during creating delivery address: ${error.message}`));
    }
  }
  async deletePaymentMethod(req, res, next) {
    try {
      return await removeEntityService.remove('method', UserPaymentMethod, req, res, next);
    } catch (error) {
      return next(error);
    }
  }
  async deleteAddress(req, res, next) {
    try {
      return await removeEntityService.remove('address', UserDeliveryAddress, req, res, next);
    } catch (error) {
      return next(error);
    }
  }
  async getAccountData(req, res, next) {
    try {
      const { userId } = req.params

      const accountData = await UserAccount.findOne({ where: { userId }, include: { all: true }})
      console.log(accountData)
      return res.json(accountData)
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during request personal account data: ${error.message}`));
    }
  }
  async removeAvatar(req, res, next) {
    try {
    //  Todo: develop after check avatar addition
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during avatar removal: ${error.message}`));
    }
  }
}

module.exports = new AccountController()