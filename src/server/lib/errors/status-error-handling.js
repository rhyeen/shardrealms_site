const log = require('../logger');

module.exports = {
  handleError,
};

function handleError(error, res) {
  let status = _getStatus(error);
  let responseBody = _getResponseBody(error);
  /* istanbul ignore if */
  if (status === 500) {
    _logUnexpectedError(error);
  }
  return res.status(status).send(responseBody);
}

function _getStatus(error) {
  let status = error.status || /* istanbul ignore next */ null;
  status = Number(status);
  /* istanbul ignore if */
  if (isNaN(status)) {
    status = 500;
  }
  /* istanbul ignore if */
  if (status < 100 || status > 500) {
    status = 500;
  }
  return status;
}

function _getResponseBody(error) {
  const message = error.message || /* istanbul ignore next */ 'Something went wrong.';
  const errorId = error.errorId || /* istanbul ignore next */ null;
  if (errorId) {
    return {
      message: message,
      error: errorId,
    };
  }
  return {
    message,
  };
}

/* istanbul ignore next */
function _logUnexpectedError(error) {
  const errorId = 'FATAL_ERROR';
  const errorMessage = error.message || 'Unable to retrieve error message';
  const errorStack = error.stack || 'Unable to retrieve error stack';
  const message = errorMessage + '\n' + errorStack;
  log.error({
    message,
    error: errorId,
    stack: errorStack,
  });
}
