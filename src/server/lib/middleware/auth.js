const log = require('../logger');

module.exports = {
  validateRequest,
};

function validateRequest(req, res, next) {
  return next();
}
