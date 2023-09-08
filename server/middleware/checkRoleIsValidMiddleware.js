const { User } = require('../models/index');

async function isValidUserRole(userId, role) {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      // DUser not found, role is not valid
      return false;
    }
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role;
  } catch (error) {
    // Handle database errors appropriately
    console.error('Error checking user role:', error);
    return false;
  }
}

module.exports = isValidUserRole;
