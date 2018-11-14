const { bcrypt, saltRounds } = require('./bcryptConfig');
const { insert } = require('../../db/operations'); // for inserting sanitized data
const userSchema = require('../../db/schemas/users.json');

const sanitizeUserData = (data) => {
  const password = data.password; // we use this whether or not it is defined

  if (!password) {
    return Promise.reject({ status: 422, message: 'Password is required.' })
  }

  const sanitizedData = { active: true }; // 'active' is always true for new users

  // We should depend on the schema to define what keys are permitted on the document.
  const permittedUserKeys = Object.keys(userSchema.properties);
  spliceKeys(permittedUserKeys, ['active', 'password']);

  // exclude any keys not explicitly defined by the collection schema
  permittedUserKeys.forEach(key => {
    if (data[key]) {
      sanitizedData[key] = data[key];
    }
  });

  return bcrypt.hash(password, saltRounds)
    .then(hash => {
      sanitizedData['password'] = hash;
      console.log('SANITIZED DATA:', sanitizedData)
      return sanitizedData;
    })
    .catch(err => Promise.reject({
      status: 500,
      message: 'There was a problem encrypting the password. The User has not been created.',
    }));
}

const spliceKeys = (ary, rejectKeys) => {
  console.log('SPLICE KEYS CALLED')
  /*
    This bit of logic here finds the index of 'active' and 'password' in the permittedUserKeys
    array and removes them, if they exist. We do this for three reasons:
      (1) We depend on the schema to define the permitted document keys;
      (2) We avoid including the client-defined value of 'active';
      (3) We are going to encrypt the password and store the encrypted password.
    For all other permitted values, we want to keep them as provided by the client.
  */
  rejectKeys.map(key => ary.indexOf(key)).forEach(idx => {
    if (idx !== -1) { ary.splice(idx, 1); }
  });
}

const create = (data) => {
  return sanitizeUserData(data)
    .then(userData => insert({
      collection: 'users',
      document: userData,
    }))
    .catch(err => Promise.reject(err)); // bubble up through Promise chain to client
}

module.exports = create;
