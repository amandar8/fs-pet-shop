'use strict';

var express = require('express');
var router = express.Router();

router.get('/english', function(req, res) {
  res.send('Hello world');
});

router.get('/spanish', function(req, res) {
  res.send('Hola mundo');
});

module.exports = router;
