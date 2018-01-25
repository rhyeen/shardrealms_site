const mysql = require('mysql');
const log = require('../logger');
const StatusError = require('../errors/status-error');
let _pool;

module.exports = {
  getConnection,
  connectionNotReleased,
  forceConnectionRelease,
  queryError,
};

/* istanbul ignore next */
function getConnection() {
  return new Promise((resolve, reject) => {
    _getConnection((err, connection) => {
      const error = _connectionError(err, connection);
      /* istanbul ignore if */
      if (error) {
        return reject(error);
      }
      return resolve(connection);
    });
  });
}

/* istanbul ignore next */
function _getConnection(callback) {
  if (_pool) {
    return _connectToPool(callback);
  }
  _connectToHost(callback);
}

/* istanbul ignore next */
function _connectToPool(callback) {
  _pool.getConnection((err, connection) => {
    /* istanbul ignore if */
    if (err) {
      return callback(err, null);
    }
    callback(null, connection);
  });
}

/* istanbul ignore next */
function _connectToHost(callback) {
  try {
    _pool = mysql.createPool({
      connectionLimit: 20,
      port: process.env.MYSQL_PORT,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    _connectToPool(callback);
  } catch(error) {
    /* istanbul ignore next */
    callback(error, null);
  }
}

function connectionNotReleased(connection) {
  return connection && _pool && _pool._freeConnections.indexOf(connection) == -1;
}

function forceConnectionRelease(connection) {
  if (connectionNotReleased(connection)) {
    connection.release();
  }
}

/* istanbul ignore next */
function _connectionError(err, connection) {
  if (err) {
    const message = 'Could not connect to the database.';
    const error = 'CONNECTION_ERROR';
    log.error({
      message,
      error,
      stack: err,
    });
    forceConnectionRelease(connection);
    return new StatusError(message, 500, error);
  }
  return null;
}

/* istanbul ignore next */
function queryError(err, connection) {
  if (err) {
    const message = 'Query failed unexpectedly.';
    const error = 'CONNECTION_ERROR';
    log.error({
      message,
      error,
      stack: err,
    });
    return new StatusError(message, 500, error);
  }
  return null;
}
