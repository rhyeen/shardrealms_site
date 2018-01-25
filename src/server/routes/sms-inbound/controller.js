const model = require('./model');
const errorHandler = require('../../lib/errors/status-error-handling');

module.exports = {
  createInboundMessage,
};

function createInboundMessage(req, res) {
  const messageSid = req.query.MessageSid;
  const from = req.query.From;
  const to = req.query.To;
  const message = req.query.Body;
  model.createInboundMessage(messageSid, from, to, message)
  .then(() => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
  }, (error) => errorHandler.handleError(error, res));
}
