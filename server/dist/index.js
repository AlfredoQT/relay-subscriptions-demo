"use strict";

require('@babel/polyfill');

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

var helmet = require('helmet');

var DatabaseConnector = require('./utils/DatabaseConnector');

var routes = require('./routes');

DatabaseConnector.getInstance().init().then(function () {
  var PORT = 4001;
  var app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); // Set the routes

  Object.values(routes).forEach(function (el) {
    app.use(el.path, el.router);
  });
  app.listen(PORT, function () {
    return console.log("Listening on port ".concat(PORT));
  });
});