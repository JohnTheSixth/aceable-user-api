/*
  Configure module.exports here to make it easier to export all existing handlers from one place.
*/
const userHandlers = require('./users');
const errorHandler = require('./errors');

module.exports = {
  userHandlers,
  errorHandler,
}
