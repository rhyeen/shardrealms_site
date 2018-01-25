module.exports = (app) => {
  app.use(require('./routes/healthcheck/index.js'));
  app.use(require('./routes/sms-inbound/index.js'));
};
