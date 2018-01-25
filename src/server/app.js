const express = require('express');
var https = require('https');
var http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync(path.join(__dirname, '../private/cert/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../private/cert/fullchain.pem'))
};

// Create an HTTP service.
http.createServer(app).listen(8080);

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

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
