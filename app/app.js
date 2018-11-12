const express = require('express');
const app = express();
const port = 3000;

// Import middlewares
const routes = require('./routes');

// Configure middlewares
app.use(express.json());
app.use('/', routes);

// Start app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
