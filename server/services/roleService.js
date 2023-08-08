const {Role, UserRole} = require("../models");

class RoleService {
  async addRole(user, role) {
    const defaultRoleId = 1
    const assignedRoles = [defaultRoleId]
    if (role) {
      const specifiedRole = await Role.findOne({ where: {name: role} })
      if (specifiedRole) {
        assignedRoles.push(specifiedRole.id)
      }
    }

    await Promise.all(
      assignedRoles.map(async (roleId) => {
        await UserRole.create({userId: user.id, roleId: roleId})
      })
    )
  }

}

module.exports = new RoleService()