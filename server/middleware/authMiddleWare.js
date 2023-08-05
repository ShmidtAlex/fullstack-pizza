const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

  if (req.method === "OPTIONS") {
    next()
  }
  try {
    let token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "user is not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
    // let token = req.headers.authorization.split( ' ')[1] // as the first element in array is a type of token (Bearer), we need the second one.
    // console.log('is there a cookies', req.cookies)
    // if (!token) {
    //   return res.status(401).json({message: "user is not authorized"})
    // } else if (req.cookies && req.cookies.jwt) {
    //   token = req.cookies.jwt; // Check if the token is present in cookies
    // }
    // const decoded = jwt.verify(token, process.env.SECRET_KEY, null, null)
    // req.user = decoded
    // next()
  } catch (e) {
    res.status(401).json({message: "user is not authorized"})
  }
}