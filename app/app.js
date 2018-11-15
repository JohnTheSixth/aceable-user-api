const express = require('express');
const app = express();
const port = 3000;

// Import DB connection and configuration function
const { db, dbConfig } = require('../db');

// Import middlewares
const routes = require('./routes');

// Configure DB and raise error if config fails
dbConfig(db)
  .then(() => console.log('Database is running.'))
  .catch(err => {
    console.log('ERROR STARTING DB:', err);
    throw err;
  });

// Configure middlewares
app.use(express.json());
app.use('/', routes);

// Start app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
