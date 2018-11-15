const dbName = require('./config.json').instance.dbName;
const usersSchema = require('../schemas/users.json')

const dbConfig = (dbConnection) => {
  return dbConnection.then(conn => {
    // Configure 'users' collection to have an enforced schema
    return conn.db(dbName).createCollection('users', { validator: { $jsonSchema: usersSchema } });
  })
    .then(collection => collection.createIndex({ 'email': 1 }, { 'unique': true }))
    .catch(err => Promise.reject(err)); // bubble up through Promise chain to client
};

module.exports = {
  dbConfig,
  dbName,
};
