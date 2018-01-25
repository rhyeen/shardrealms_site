const basepath = '';
const express = require('express');
const router = new express.Router();
const controller = require('./controller');
const auth = require('../../lib/middleware/auth');

module.exports = router;

router.route(basepath + '/sms/inbound')
  .all(auth.validateRequest)
  .get(controller.createInboundMessage);
