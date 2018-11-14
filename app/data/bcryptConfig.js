const bcrypt = require('bcrypt');
/*
  For a production application, we should benchmark what our server can tolerate and then set
  the saltRounds to be near that limit. For this application, a default of 10 will work.
*/
const saltRounds = 10;

module.exports = {
  bcrypt,
  saltRounds,
}
