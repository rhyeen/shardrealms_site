module.exports = (app) => {
  app.use(require('./routes/healthcheck/index.js'));
};
