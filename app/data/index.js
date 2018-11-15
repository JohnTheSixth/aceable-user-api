const create = require('./requestCreate');
const find = require('./requestFind');
const deactivate = require('./requestDeactivate');

const response = require('./response');

module.exports = {
  request: {
    create,
    find,
    deactivate,
  },
  response, // This is also an object like module.exports.request; all the logic is in response.js
}
