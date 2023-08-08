class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status
    this.message = message
  }
  // Todo: check all types of errors by postman
  static forbidden(message) {
    return new ApiError(403, message)
  }
  static badRequest(message) {
    return new ApiError(404, message)
  }
  static internal(message) {
    return new ApiError(500, message)
  }
  static notFound(message) {
    return new ApiError(4041, message)
  }
}

module.exports = ApiError