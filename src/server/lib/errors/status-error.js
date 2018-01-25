module.exports = function StatusError(message, status = null, errorId = null) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.errorId = errorId;
  this.status = status;
};

require('util').inherits(module.exports, Error);
