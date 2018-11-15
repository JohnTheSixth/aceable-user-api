const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const { saltRounds } = require('./bcryptConfig');
const { findOne } = require('../../db/operations');

// query searches for documents with specified ObjectId that have an active status
// return promises here because we need to pass errors up the promise chain to the client
const userIdQuery = (docId) => {
  try {
    return Promise.resolve({
      _id: { $eq: ObjectId(docId) },
      active: { $eq: true },
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const findUserByEmailPass = ({ email, password }) => {
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

const findUserById = (docId) => {
  return userIdQuery(docId)
    .then(query => findOne({ collection: 'users', query }))
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
};

module.exports = {
  findUserByEmailPass,
  findUserById,
  userIdQuery, // this is only used in the 'requestDeactivate.js' script
};
