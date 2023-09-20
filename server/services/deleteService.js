const ApiError = require("../error/ApiError");

class removeEntity {
  async remove(entityName, modelName, req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest(`missed parameter ${ entityName } id`))
      }
      const entity = await modelName.findByPk(id)
      await entity.destroy()
      return res.json({ message: `${entityName} successfully removed` })
    } catch (error) {
      return next(ApiError.internalServerError(`An error occurred during deleting ${entityName} ${error.message}`))
    }
  }
}

module.exports = new removeEntity()