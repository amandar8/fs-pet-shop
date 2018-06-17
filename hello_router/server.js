'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var greet = require('./greet');

app.use(greet);

app.listen(port, function() {
  console.log('Listening on port', port);
});
