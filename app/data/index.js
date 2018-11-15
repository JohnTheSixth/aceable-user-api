const create = require('./requestCreate');
const { findUserByEmailPass, findUserById } = require('./requestFind');
const deactivate = require('./requestDeactivate');

const response = require('./response');

module.exports = {
  request: {
    create,
    findUserByEmailPass,
    findUserById,
    deactivate,
  },
  response, // This is also an object like module.exports.request; all the logic is in response.js
};
