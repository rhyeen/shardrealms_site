const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const accessLogStream = fs.createWriteStream('/var/log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(function(error, req, res, next) {
  /* istanbul ignore else */
  if (error instanceof SyntaxError) {
    res.status(400).send('Request body must be valid JSON.');
  } else {
    next();
  }
});
app.use(cookieParser());

// Load in your routes
require('./registerRoutes')(app);

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
