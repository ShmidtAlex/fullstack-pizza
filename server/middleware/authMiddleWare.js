const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split( ' ')[1] // as the first element in array is a type of token (Bearer), we need the second one.
    if (!token) {
      return res.status(401).json({message: "user is not authorized"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY, null, null)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: "user is not authorized"})
  }
}