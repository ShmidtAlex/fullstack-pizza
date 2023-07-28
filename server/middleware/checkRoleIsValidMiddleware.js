const { User } = require('../models/index');

async function isValidUserRole(userId, role) {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      // User not found, role is not valid
      return false;
    }

    // Check if the user's role matches the expected role
    console.log('CHECK_ROLE_IS_VALID', user.role, role)
    return user.role === role;
  } catch (error) {
    // Handle database errors appropriately
    console.error('Error checking user role:', error);
    return false;
  }
}

module.exports = isValidUserRole;
