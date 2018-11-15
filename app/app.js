const express = require('express');
const app = express();

// Import DB connection and configuration function
const { db, dbConfig } = require('../db');

// Import middlewares
const routes = require('./routes');

// Configure DB and raise error if config fails
dbConfig(db)
  .then(conn => console.log('Collections and indices created.'))
  .catch(err => {
    console.log('ERROR STARTING DB:', err);
    throw err;
  });

// Configure middlewares
app.use(express.json());
app.use('/', routes);

// Export configured app for running or testing
module.exports = app;
