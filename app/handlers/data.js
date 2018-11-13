const { db } = require('../../db');

const scrubCreateData = (data) => {
  // insert data handling logic here

  // placeholder logic
  if (data.version) {
    return Promise.reject({ status: 404, message: 'Version numbers are not permitted.' });
  } else {
    return Promise.resolve(data);
  }
}

const insertUser = (data) => db.then((conn) => {
  console.log('INSERT USER');
  return conn.db('user-development').collection('users').insertOne(data);
});

const createUser = (data) => {
  console.log('CREATE USER');

  return scrubCreateData(data)
    .then(data => insertUser(data))
    .catch(err => Promise.reject(err));
}

const findUser = (data) => {
  console.log('FIND USER:', data);
}

const updateUser = (data) => {

}

module.exports = {
  create: createUser,
  find: findUser,
  update: updateUser,
  deactivate: (data) => { console.log(data); }
}
