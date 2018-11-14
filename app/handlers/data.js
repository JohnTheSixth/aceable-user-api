const { db } = require('../../db');
const userSchema = require('../../db/schemas/users.json');

const sanitizeData = (data) => {
  const sanitizedData = { active: true };

  const permittedUserKeys = Object.keys(userSchema.properties);
  const activeKeyIndex = permittedUserKeys.indexOf('active');
  if (activeKeyIndex !== -1) {
    permittedUserKeys.splice(activeKeyIndex, 1);
  }

  permittedUserKeys.forEach(key => {
    if (data[key]) {
      sanitizedData[key] = data[key];
    }
  });
  console.log('SANITIZED DATA:', sanitizedData)
  return Promise.resolve(sanitizedData);
}

const insertUser = (data) => db.then(conn => {
  console.log('INSERT USER');
  return conn.db('user-development').collection('users').insertOne(data);
});

const queryUser = (data) => db.then(conn => {
  console.log('QUERY USER');

});

const createUser = (data) => {
  console.log('CREATE USER');

  return sanitizeData(data)
    .then(data => insertUser(data))
    .catch(err => Promise.reject(err)); // we need to bubble this up to the request handler
}

const findUser = (data) => {
  confirmFields(data)
    .then(data => )
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
