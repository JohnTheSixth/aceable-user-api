// Configure module.exports here to make it easier to export all existing handlers
// from one place.

module.exports = {
  userHandlers: require('./users'),
  dataHandlers: require('./data'),
  errorHandler: require('./errors')
}
