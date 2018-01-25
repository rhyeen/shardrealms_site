const mysql = require('../../lib/services/mysql-promisify');

module.exports = {
  createInboundMessage,
};

function createInboundMessage(messageSid, from, to, message) {
  return new Promise((resolve, reject) => {
    mysql.getConnection().then((connection) => {
      const query = 'INSERT INTO `sms_inbound` (`message_sid`, `from`, `message`, `to`, `datetime`) VALUES (?, ?, ?, ?, NOW())';
      const params = [
        messageSid,
        from,
        message,
        to,
        message
      ];
      connection.query(query, params, (err, rows, fields) => {
        /* istanbul ignore if */
        if (mysql.queryError(err, connection)) {
          return reject(mysql.queryError(err, connection));
        }
        mysql.forceConnectionRelease(connection);
        return resolve();
      });
    }, function(error) {
      console.log(error);
    });
  });
}
