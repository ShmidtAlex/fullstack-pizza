const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // hash passwords in order not to keep them in plain text
const jwt = require('jsonwebtoken')
const { User, Cart, UserRole, Role } = require('../models')

const generateJWT = (payload, key, options, callback) =>{
  return jwt.sign(payload, key, options, callback)
}
class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Wrong email or password'));
    }
   
   

    const defaultRoleId = 1
    const assignedRoles = [defaultRoleId]
    if (role) {
      const specifiedRole = await Role.findOne({ where: { name: role }})
      console.log('SPECIFIED_ROLE', specifiedRole.id)
      if (specifiedRole) {
       assignedRoles.push(specifiedRole.id)
      }
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User with such an email already exists'));
    }

    // if conditions correct, register user and hash password:
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create(({ email, role, password: hashPassword }))

    // add all roles to UserRole table
    await Promise.all(
      assignedRoles.map( async (roleId) => {
        console.log('ROLE_ID', roleId)
        await UserRole.create({ userId: user.id, roleId: roleId })
      })
    )
   
    const cart = await Cart.create({ userId: user.id })
    const token = generateJWT({ id: user.id, email: user.email, role }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        // Handle the error
        console.error('Error creating token:', err);
        // ...
      } else {
        // Use the generated token
        console.log('Generated token:', token);
        return res.json({ token })
        // ...
      }
    })

  }
  async login(req, res) {

  }
  async checkIsAuth(req, res, next) {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('no  id found'))
      }
      res.json(id)
  }
  async deleteUser(req, res) {

  }
  // for business purposes only
  async getAllUsers (req, res) {

  }
}

module.exports = new UserController()