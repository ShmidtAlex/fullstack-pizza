const jwt = require('jsonwebtoken')
const isValidUserRole = require('../middleware/checkRoleIsValidMiddleware')
const ApiError = require("../error/ApiError");
module.exports = function(roles) {
  return async function (req, res, next) {

    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
      if (!token) {
        return next(ApiError.unauthorized("user is not authorized, there is no token"))
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY, null, null)

      if (!roles.includes(decoded.role)) {
        return next(ApiError.unauthorized("Has no access, the role doesn't match"))
      }

      const isValidRole = await isValidUserRole(decoded.id, decoded.role);
      if (!isValidRole) {
        // User's role has been changed, invalidate the token and log out
        // You can blacklist the token or use a token version mechanism
        return next(ApiError.unauthorized("Role changed, please log in again"));
      }
      req.user = decoded;
      next()
    } catch (e) {
      return next(ApiError.unauthorized("User is not authorized"));
    }
  };
}