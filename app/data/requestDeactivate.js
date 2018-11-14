const { find, update } = require('../../db/operations');
const { ObjectId } = require('../../db');

const deactivate = (docId) => {
  const query = { _id: { $eq: ObjectId(docId) } };
  console.log('QUERY:', query)

  return find({ collection: 'users', query })
    .then(document => {
      console.log('DOCUMENT:', document)
      if (!document) {
        return Promise.reject({
          status: 404,
          message: 'No document found with that ID.',
        });
      }

      // Check and see if the existing document is active, and raise an error if not.
      if (!document.active) {
        return Promise.reject({
          status: 404,
          message: 'No active user found with that ID.',
        });
      }

      const updates = { $set: { active: false } };
      return update({ collection: 'users', query, updates })
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
    .catch(err => Promise.reject(err));  // bubble up through Promise chain to client
}

module.exports = deactivate;
