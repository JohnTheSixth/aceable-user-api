const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const { saltRounds } = require('./bcryptConfig');
const { findOne } = require('../../db/operations');

// query searches for documents with specified ObjectId that have an active status
const userIdQuery = (docId) => ({
  _id: { $eq: ObjectId(docId) },
  active: { $eq: true },
});

const findByEmailPass = ({ email, password }) => {
  if (!email || !password) {
    return Promise.reject({
      status: 422,
      message: 'User query must include both email and password.',
    });
  }

  const query = {
    email: { $eq: email },
    active: { $eq: true },
  };

  return findOne({ collection: 'users', query })
    .then(document => {
      if (!document) {
        return Promise.reject({
          status: 404,
          message: 'Email does not match any currently active user.',
        });
      }

      return bcrypt.compare(password, document.password)
        .then(result => {
          if (result) {
            return document;
          } else {
            return Promise.reject({ status: 401, message: 'Password does not match.' });
          }
        })
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err)); // bubble up through Promise chain to client
};

const findById = (docId) => {
  const query = userIdQuery(docId);
  console.log('USER ID QUERY:')

  return findOne({ collection: 'users', query })
    .then(document => {
      if (!document) {
        return Promise.reject({
          status: 404,
          message: 'No active user found with that ID.',
        });
      } else {
        return document;
      }
    })
    .catch(err => Promise.reject(err));
}

module.exports = {
  findUserByEmailPass: findByEmailPass,
  findUserById: findById,
  userIdQuery,
};
