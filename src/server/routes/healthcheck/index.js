const basepath = '';
const express = require('express');
const router = new express.Router();

module.exports = router;

router.get(basepath + '/healthcheck', (req, res) => {
  res.json({status: 'ok'});
});
