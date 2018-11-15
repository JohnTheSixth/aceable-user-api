const { ObjectId } = require('mongodb');

const { findOne, update } = require('../../db/operations');
const { userIdQuery } = require('./requestFind');

const deactivate = (docId) => {
  let userQuery;

  return userIdQuery(docId)
    .then(query => {
      userQuery = query;
      return findOne({ collection: 'users', query });
    })
    .then(document => {
      if (!document) {
        return Promise.reject({
          status: 404,
          message: 'No active user found with that ID.',
        });
      }

      const updates = { $set: { active: false } };
      return update({ collection: 'users', query: userQuery, updates })
        .then(data => {
          if (data.result.ok === 1) {
            return Promise.resolve({ message: 'The user was successfully deactivated.' });
          } else {
            return Promise.reject({
              status: 500,
              message: 'There was a problem deactivating that user.',
            });
          }
        });
    })
    .catch(err => Promise.reject(err)); // bubble up through Promise chain to client
};

module.exports = deactivate;
