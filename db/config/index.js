const dbName = require('./config.json').instance.dbName;
const usersSchema = require('../schemas/users.json')

const dbConfig = (dbConnection) => {
  console.log('DB CONNECTION:', dbConnection);
  return dbConnection.then(conn => {
    console.log('CONN:', conn);
    // Configure 'users' collection to have an enforced schema
    return conn.db(dbName).createCollection('users', { validator: { $jsonSchema: usersSchema } });
  })
    .then(collection => {
      console.log('COLLECTION:', collection);
      return collection.createIndex({ 'email': 1 }, { 'unique': true });
    })
    .catch(err => Promise.reject(err)) // bubble error up through promise chain
}

module.exports = dbConfig;
