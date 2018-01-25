const model = require('./model');
const errorHandler = require('../../lib/errors/status-error-handling');

module.exports = {
  createInboundMessage,
};

function createInboundMessage(req, res) {
  const messageSid = req.body.MessageSid;
  const from = req.body.From;
  const to = req.body.To;
  const message = req.body.Body;
  model.createInboundMessage(messageSid, from, to, message)
  .then(() => res.send(), (error) => errorHandler.handleError(error, res));
}
