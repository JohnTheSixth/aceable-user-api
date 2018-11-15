const app = require('./app');
const port = 3000;

// Start app
app.listen(port, () => console.log(`User API now listening at http://localhost:${port}/users`));
