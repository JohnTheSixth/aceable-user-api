const { bcrypt, saltRounds } = require('./bcryptConfig');
const { find } = require('../../db/operations');

const findByEmailPass = ({ email, password }) => {
  if (!email || !password) {
    return Promise.reject({
      status: 422,
      message: 'User query must include both email and password.',
    });
  }

  const query = { email: { $eq: email } };

  return find({ collection: 'users', query })
    .then(document => {
      if (!document) {
        return Promise.reject({
          status: 404,
          message: 'Email does not match any existing records.',
        });
      }

      return bcrypt.compare(password, document.password)
        .then(result => {
          if (result) {
            return Promise.resolve(document);
          } else {
            return Promise.reject({ status: 401, message: 'Password does not match.' });
          }
        })
        .catch(err => Promise.reject(err));
    })
    .catch(err => Promise.reject(err)); // bubble up through Promise chain to client
}

module.exports = findByEmailPass;
