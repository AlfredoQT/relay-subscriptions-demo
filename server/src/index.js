require('@babel/polyfill');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const DatabaseConnector = require('./utils/DatabaseConnector');
const routes = require('./routes');

DatabaseConnector.getInstance()
  .init()
  .then(() => {
    const PORT = 4001;
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Set the routes
    Object.values(routes).forEach(el => {
      app.use(el.path, el.router);
    });

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  });
