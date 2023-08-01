const jwt = require('jsonwebtoken')
const isValidUserRole = require('../middleware/checkRoleIsValidMiddleware')
module.exports = function(role) {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
      if (!token) {
        return res.status(401).json({message: "Not authorized"})
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY, null, null)
      if (decoded.role !== role) {
        return res.status(403).json({message: "Has no access"})
      }

      const isValidRole = await isValidUserRole(decoded.id, decoded.role);
      if (!isValidRole) {
        // User's role has been changed, invalidate the token and log out
        // You can blacklist the token or use a token version mechanism
        return res.status(401).json({ message: "Role changed, please log in again" });
      }

      req.user = decoded;
      next()
    } catch (e) {
      res.status(401).json({message: "Not authorized"})
    }
  };
}