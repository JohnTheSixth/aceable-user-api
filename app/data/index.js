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
  response,
}
