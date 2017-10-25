const app = require('../app.js');
const logger = require('../lib/logger');

const port = process.env.EXPRESS_PORT || 3500;

app.listen(port, () => {
  logger.info('Application running on port: ' + port);
});
